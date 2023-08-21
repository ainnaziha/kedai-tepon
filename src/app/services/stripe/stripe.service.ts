import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { CheckoutService } from '../checkout/checkout.service';
import { environment } from 'src/environments/environment';

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
    this.stripe = await loadStripe(environment.stripeKey);
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

  async handlePayment(checkoutId: string) {
    this.isLoad = true;
    try {
      const paymentMethodResult = await this.createPaymentMethod();

      if (paymentMethodResult) {
        const paymentMethodId = paymentMethodResult.paymentMethod.id;
        await this.checkoutService.captureOrder(paymentMethodId, checkoutId);
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
