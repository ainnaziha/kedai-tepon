import { Injectable } from '@angular/core';
import { CommerceService } from '../commerce-js/commerce.service';
import { AuthService } from '../auth/auth.service';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { UserCartService } from '../user-cart/user-cart.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { Price } from 'src/app/models/price.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  cart: any;

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService,
    private userCartService: UserCartService,
    private errorDialogService: ErrorDialogService,
  ) {}

  async addToCart(product: Product): Promise<void> {
    await this.getUserCart();
    if (this.cart) {
      const existingCartItemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
      if (existingCartItemIndex !== -1) {
        this.cartItems[existingCartItemIndex].quantity += 1;
        this.commerceService.commerce.cart.update(this.cartItems[existingCartItemIndex].id, { quantity: this.cartItems[existingCartItemIndex].quantity}).then(cart => this.cart = cart);
      } else {
        this.commerceService.commerce.cart.add(product.id, 1)
        .then(cart => {
          this.cart = cart;
          this.cartItems = this.cart.line_items.map(item => {
            return new CartItem(item);
          });
        });
      }
    } else {
      this.errorDialogService.openDialog('You need to be logged in to add to cart.');
    }
  }

  async getCartItems(): Promise<void> {
    await this.getUserCart();
    if (this.cart) {
      this.cartItems = await Promise.all(this.cart.line_items.map(async item => {
        return new CartItem(item);
      }));
      this.cartItemsSubject.next(this.cartItems);
    } else {
      this.cartItems = [];
      this.cartItemsSubject.next(this.cartItems);
    }
  }  

  private async getCart(cartId: String | null): Promise<void> {
    try {
      if (cartId) {
        this.cart = await this.commerceService.commerce.cart.retrieve(cartId);
      } else {
        this.cart = await this.commerceService.commerce.cart.refresh();
      }
    } catch (e) {
      console.log('Get cart error: ' + e);
    }
  }

  async getUserCart(): Promise<void> {
    const user = await this.authService.getUser$.pipe(take(1)).toPromise();
    if (user) {
      if (!this.cart) {
        const cartId = await this.userCartService.getCartId(user.uid);
        await this.getCart(cartId);
        if (this.cart) {
          this.userCartService.createOrUpdateCart(user.uid, this.cart.id);
        }
      }
    }
  }

  clear() {
    this.cartItems = [];
    this.cart = null;
  }

  get subTotal(): Price | null {
    return this.cart ? new Price(this.cart.subtotal) : null;
  }

  async updateCart(id: string, quantity: number): Promise<void> {
    const index = this.cartItems.findIndex(item => item.id === id);

    this.commerceService.commerce.cart.update(id, { quantity: quantity}).then((cart) => {
      this.cartItems[index].quantity = quantity;
      this.cartItemsSubject.next(this.cartItems);
      this.cart = cart;
    });  
  }
}