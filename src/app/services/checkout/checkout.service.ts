import { Injectable } from '@angular/core';
import { CheckoutData } from 'src/app/models/checkout-data.model';
import { Order } from 'src/app/models/order.model';
import { UserCartService } from '../user-cart/user-cart.service';
import { Router } from '@angular/router';
import { CommerceService } from '../commerce-js/commerce.service';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutData?: CheckoutData;
  private order?: Order;

  constructor(
    private userCartService: UserCartService,
    private router: Router,
    private commerceService: CommerceService,
    private cartService: CartService
  ) {}

  setCheckoutData(data?: CheckoutData) {
    this.checkoutData = data;
  }

  get getCheckoutData() {
    return this.checkoutData;
  }

  setOrder(order?: Order) {
    this.order = order;
  }

  get getOrder() {
    return this.order;
  }

  async generateCheckoutToken(id: string): Promise<CheckoutData | null> {
    const response = await this.commerceService.commerce.checkout.generateTokenFrom('cart', id);
    return response ? new CheckoutData(response) : null;
  }

  async captureOrder(paymentId: string, checkoutToken: string, email: string, 
    name: string, street: string, townCity: string) {
    try {
      const response = await this.commerceService.commerce.checkout.capture(checkoutToken, {
        customer: {
          firstname: name,
          email: email,
        },
        shipping: {
          name: name,
          street: street,
          town_city: townCity,
          country: 'MY',
        },
        fulfillment: {
          shipping_method: this.checkoutData.shippingMethod,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentId,
          },
        },
      });
      
      const order = new Order(response);
      this.order = order;
      this.checkoutData = null;
      this.cartService.clear();
      this.userCartService.deleteCart();
      this.router.navigate(['/payment/success']);
    } catch (error) {
      this.checkoutData = null;
      this.router.navigate(['/payment/error']);
    }
  }
}
