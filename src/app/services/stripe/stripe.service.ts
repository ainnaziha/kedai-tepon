import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { CheckoutService } from '../checkout/checkout.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe;
  private card: StripeCardElement;

  constructor(
    private errorDialogService: ErrorDialogService,
    private checkoutService: CheckoutService
  ) {
    this.initializeStripe();
  }

  isLoad : boolean = false;

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51NhByWGCUzgFfsjumc0gWcNu119wmEbiSLGbFFV7Eqi9lnr2VBGyjJL840CG863FpSjg1xI2UVnNUjLw1047eAFr00VuUIZTH3');
    this.card = this.stripe.elements().create('card', {style: {
      base: {
        fontFamily: '"Helvetica Neue", sans-serif',
        color: '#333',
        fontSize: '16px',
        '::placeholder': {
          color: '#ccc'
        }
      }
    }
    });
  }

  mountCardElement(elementRef: HTMLElement) {
    this.card.mount(elementRef);
  }

  async handlePayment(checkoutId: string, email: string, name: string, street: string, townCity: string) {
    this.isLoad = true;
    try {
      const paymentMethodResult = await this.createPaymentMethod();

      if (paymentMethodResult) {
        const paymentMethodId = paymentMethodResult.paymentMethod.id;
        await this.checkoutService.captureOrder(paymentMethodId, checkoutId, email, name, street, townCity);
      }
    } finally {
      this.isLoad = false;
    }
  }

  async createPaymentMethod(): Promise<any> {
    try {
      const result = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });
      return result;
    } catch (error) {
      this.errorDialogService.openDialog(error.message);
      return null;
    }
  }

  async createPaymentToken(): Promise<string | null> {

    try {
      const { token, error } = await this.stripe.createToken(this.card);
      if (token) {
        return token.id;
      } else if (error) {
        this.errorDialogService.openDialog(error.message);
        return null;
      }
      return null;
    } catch (error) {
      this.errorDialogService.openDialog(error.message);
      return null;
    }
  } 
}
