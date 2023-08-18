import { Injectable } from '@angular/core';
import { CommerceService } from '../commerce-js/commerce.service';
import { AuthService } from '../auth/auth.service';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService
  ) {}

  clearCart(): void {
    this.cartItems = [];
    this.updateCommerceCart();
  }

  getTotal(): number {
    return this.cartItems.length;
  }

  async addToCart(product: Product, quantity: number): Promise<void> {
    this.cartItems.push({
      product,
      quantity
    });
    await this.updateCommerceCart();
  }

  private async updateCommerceCart(): Promise<void> {
    const user = this.authService.getUser;
    if (user) {
      const userCart = await this.commerceService.getUserCart(user.uid);
      await this.commerceService.commerce.cart.update(userCart.id, {
        line_items: this.cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      });
    }
  }

 async getCartItems(): Promise<CartItem[]> {
    const user = this.authService.getUser;
    if (user) {
      const userCart = await this.commerceService.getUserCart(user.uid);
      this.cartItems = userCart.line_items || [];
    } else {
      this.cartItems = [];
    }

    return this.cartItems;
  }
}
