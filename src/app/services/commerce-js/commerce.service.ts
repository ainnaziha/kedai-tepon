import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  public commerce: Commerce;

  constructor() {
    this.commerce = new Commerce('pk_test_537353a87d16b50e31fcc40be09492969601d2caa8135', true);
  }

  private async generateCheckoutToken(id: string): Promise<any> {
    return await this.commerce.checkout.generateTokenFrom('cart', id)
  }

  async captureOrder(paymentToken: string, cartId: string, email: string) {
    const checkoutToken = await this.generateCheckoutToken(cartId);
    try {
      const order = await this.commerce.checkout.capture(checkoutToken.id, {
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
