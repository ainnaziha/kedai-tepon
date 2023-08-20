import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { CommerceService } from '../commerce-js/commerce.service';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe;
  private card: StripeCardElement;

  constructor(
    private commerceService: CommerceService,
    private errorDialogService: ErrorDialogService
  ) {
    this.initializeStripe();
  }

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

  async handlePayment(cartId: string, email: string) {
    const token = await this.createPaymentToken();
    if (token) {
      this.commerceService.captureOrder(token, cartId, email);
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
