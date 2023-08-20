import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef;
  checkoutId: string;
  userName: string = '';
  userEmail: string = '';
  userStreet: string = '';
  userTown: string = '';

  constructor(
    private stripeService: StripeService, 
    private authService: AuthService,
    private route: ActivatedRoute,
    public checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.checkoutId = params.get('checkout_id');
    });
    this.userName = this.authService.getUser.displayName;
    this.userEmail = this.authService.getUser.email;
  }

  ngAfterViewInit(): void {
    this.stripeService.mountCardElement(this.cardElement.nativeElement);
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  async handlePayment() {
    const emailValid = this.validateEmail(this.userEmail);
    if (emailValid && this.userName && this.userStreet && this.userTown) {
      this.stripeService.handlePayment(this.checkoutId, this.userEmail, this.userName, this.userStreet, this.userTown);
    }
  }
}
