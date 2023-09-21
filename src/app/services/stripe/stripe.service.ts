import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { CustomDialogService } from '../custom-dialog/custom-dialog.service';
import { CheckoutService } from '../checkout/checkout.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe;
  private card: StripeCardElement;

  constructor(
    private customDialogService: CustomDialogService,
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

  async handlePayment() {
    this.isLoad = true;
    try {
      const paymentMethodResult = await this.createPaymentMethod();

      if (paymentMethodResult) {
        await this.checkoutService.completeOrder();
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
      this.customDialogService.openErrorDialog(error.message);
      return null;
    }
  }
}
