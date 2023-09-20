import { Injectable } from '@angular/core';
import { CommerceService } from '../commerce-js/commerce.service';
import { AuthService } from '../auth/auth.service';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { UserCartService } from '../user-cart/user-cart.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { Price } from 'src/app/models/price.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: CartItem[] = [];
  public cartTotal: number = 0;
  cart: any;

  isLoading: boolean = false;

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService,
    private userCartService: UserCartService,
    private errorDialogService: ErrorDialogService,
    private httpService: HttpService,

  ) {}

  async getTotalCart() {
    this.httpService.get('cart/total').subscribe(
      (r) => {
        if (r['data'] != null) {
          this.cartTotal = r['data'];
        }
      },
      (e) => {
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }


  async addToCart(productId: number): Promise<void> {
    this.httpService.post('cart/add', {'productId': productId}).subscribe(
      (r) => {

      },
      (e) => {
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }

  async getCartItems(): Promise<void> {
    this.isLoading = true;

    try {
      await this.getUserCart();
      if (this.cart) {
        this.cartItems = await Promise.all(this.cart.line_items.map(async item => {
          return new CartItem(item);
        }));
      } else {
        this.cartItems = [];
      }
    } finally {
      this.isLoading = false;
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
    const user = this.authService.getUser;
    if (user) {
      if (!this.cart) {
        const cartId = await this.userCartService.getCartId();
        await this.getCart(cartId);
        if (this.cart) {
          this.userCartService.createOrUpdateCart(this.cart.id);
        }
      }
    }
  }

  clear() {
    this.cartItems = [];
    this.cart = null;
    localStorage.removeItem('cart_id');
  }

  get subTotal(): Price | null {
    return this.cart ? new Price(this.cart.subtotal) : null;
  }

  async updateCart(id: string, quantity: number): Promise<void> {
    const index = this.cartItems.findIndex(item => item.id === id);

    await this.commerceService.commerce.cart.update(id, { quantity: quantity}).then(async (cart) => {
      this.cartItems = await Promise.all(cart.line_items.map(async item => {
        return new CartItem(item);
      }));
      this.cart = cart;
    });  
  }

  async deleteCart(id: string): Promise<void> {
    const index = this.cartItems.findIndex(item => item.id === id);

    await this.commerceService.commerce.cart.remove(id).then(async (cart) => {
      this.cartItems = await Promise.all(cart.line_items.map(async item => {
        return new CartItem(item);
      }));
      this.cart = cart;
    });  
  }
}