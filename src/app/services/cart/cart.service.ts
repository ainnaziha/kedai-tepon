import { Injectable } from '@angular/core';
import { CommerceService } from '../commerce-js/commerce.service';
import { AuthService } from '../auth/auth.service';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { UserCartService } from '../user-cart/user-cart.service';
import { take } from 'rxjs';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  cart: any;

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService,
    private userCartService: UserCartService,
    private errorDialogService: ErrorDialogService,
  ) {
    this.getCartItems();
  }

  async addToCart(product: Product, quantity: number): Promise<void> {
    await this.getUserCart();
    if (this.cart) {
      const existingCartItemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
      if (existingCartItemIndex !== -1) {
        this.cartItems[existingCartItemIndex].quantity += quantity;
        this.commerceService.commerce.cart.update(this.cartItems[existingCartItemIndex].id, { quantity: this.cartItems[existingCartItemIndex].quantity}).then(cart => this.cart = cart);
      } else {
        this.commerceService.commerce.cart.add(product.id, quantity)
        .then(cart => {
          console.log(cart);

          this.cart = cart;
          this.cartItems = this.cart.line_items.map(item => {
            const productData = { id: item.product_id, name: item.product_name, description: "", price: item.price.formatted_with_symbol, imageUrl: item.image?.url };
            const product = new Product(productData);
            const cartItem: CartItem = {
              id: item.id,
              product: product,
              quantity: item.quantity
            };
    
            return cartItem;
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
        const productData = {
          id: item.product_id,
          name: item.product_name,
          description: "",
          price: item.price.formatted_with_symbol,
          imageUrl: item.image?.url
        };
        const product = new Product(productData);
  
        return {
          id: item.id,
          product: product,
          quantity: item.quantity
        };
      }));
    } else {
      this.cartItems = [];
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
}
