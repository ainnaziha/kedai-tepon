import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Shipping } from 'src/app/models/shipping.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-1.component.html',
})
export class Checkout1Component implements OnInit {
  shipping: Shipping = {
    email: '',
    name: '',
    street: '',
    town: ''
  };

  constructor(
    private authService: AuthService,
    public checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.checkoutService.getShipping) {
      this.shipping = this.checkoutService.getShipping;
    } else {
      this.shipping.email = this.authService.getUser.email;
      this.shipping.name = this.authService.getUser.displayName;
    }
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  next() {
    const emailValid = this.validateEmail(this.shipping.email);
    if (emailValid && this.shipping.name && this.shipping.street && this.shipping.town) {
      this.checkoutService.setShippingDetails(this.shipping);
      this.route.paramMap.subscribe(params => {
        this.router.navigate(['/checkout/2', params.get('checkout_id')]);
      });
    }
  }
}