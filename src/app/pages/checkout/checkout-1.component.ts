import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-1.component.html',
})
export class Checkout1Component {
  constructor(
    public checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  next() {
    const emailValid = this.validateEmail(this.checkoutService.checkoutData.email);
    if (emailValid && this.checkoutService.checkoutData.name && this.checkoutService.checkoutData.street && this.checkoutService.checkoutData.town) {
      this.route.paramMap.subscribe(params => {
        this.router.navigate(['/checkout/2', params.get('order_no')]);
      });
    }
  }
}