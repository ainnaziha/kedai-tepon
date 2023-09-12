import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-2.component.html',
})
export class Checkout2Component implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef;
  checkoutId: string;

  constructor(
    private stripeService: StripeService, 
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService
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
    this.stripeService.handlePayment(this.checkoutId);
  }

  get isLoad() {
    return this.stripeService.isLoad;
  }

  previous() {
    this.router.navigate(['/checkout/1', this.checkoutId]);
  }

  get total() {
    let data = this.checkoutService.getCheckoutData;
    if (data && (this.checkoutId != data.id)) {
      data = null;
    }
    return data ? `Total Price: ${data.total.formattedWithSymbol}` : 'No order detected';
  }
}
