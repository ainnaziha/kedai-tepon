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
  orderNo: string;

  constructor(
    private stripeService: StripeService, 
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderNo = params.get('order_no');
    });
  }

  ngAfterViewInit(): void {
    this.stripeService.mountCardElement(this.cardElement.nativeElement);
  }

  async handlePayment() {
    this.stripeService.handlePayment(this.orderNo);
  }

  get isLoad() {
    return this.stripeService.isLoad;
  }

  previous() {
    this.router.navigate(['/checkout/1', this.orderNo]);
  }

  get total() {
    let data = this.checkoutService.checkoutData;
    if (data && (this.orderNo != data.orderNo)) {
      data = null;
    }
    return data ? `Total Price: RM ${data.total}` : 'No order detected';
  }
}
