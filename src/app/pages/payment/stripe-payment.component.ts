import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
})
export class StripePaymentComponent implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef;
  checkoutId: string;

  constructor(
    private stripeService: StripeService, 
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.checkoutId = params.get('checkout_id');
    });
  }

  ngAfterViewInit(): void {
    this.stripeService.mountCardElement(this.cardElement.nativeElement);
  }

  async handlePayment() {
    this.stripeService.handlePayment(this.checkoutId, this.authService.userEmail);
  }
}
