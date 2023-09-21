import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
})
export class PaymentSuccessComponent {
  constructor(
    public checkoutService: CheckoutService,
    private router: Router,
  ){}

  backToHome() {
    this.router.navigate(['/home']);
  }
}
