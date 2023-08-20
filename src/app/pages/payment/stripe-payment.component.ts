import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
})
export class StripePaymentComponent {
  @ViewChild('cardElement') cardElement: ElementRef;

  constructor(
    private stripeService: StripeService, 
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngAfterViewInit(): void {
    this.stripeService.mountCardElement(this.cardElement.nativeElement);
  }

  async handlePayment() {
    this.stripeService.handlePayment(this.cartService.cart.id, this.authService.userEmail);
  }
}
