import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { CheckoutData } from 'src/app/models/checkout-data.model';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  public commerce: Commerce;

  constructor() {
    this.commerce = new Commerce('pk_test_537353a87d16b50e31fcc40be09492969601d2caa8135', true);
  }

  async generateCheckoutToken(id: string): Promise<CheckoutData | null> {
    const response = await this.commerce.checkout.generateTokenFrom('cart', id);
    console.log(response);
    return response ? new CheckoutData(response) : null;
  }

  async captureOrder(paymentToken: string, checkoutToken: string, email: string) {
    try {
      const order = await this.commerce.checkout.capture(checkoutToken, {
        customer: {
          email: email,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentToken,
          },
        },
      });
  
      console.log('Order captured:', order);
    } catch (error) {
      console.error('Error capturing order:', error);
    }
  }
}
