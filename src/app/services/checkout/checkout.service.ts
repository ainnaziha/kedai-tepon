import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Checkout } from 'src/app/models/checkout.model';
import { HttpService } from '../http/http.service';
import { CustomDialogService } from '../custom-dialog/custom-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public checkoutData?: Checkout | null;
  
  constructor(
    private router: Router,
    private httpService: HttpService,
    private customDialogService: CustomDialogService
  ) {}

  async checkout(total: string, name: string, email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.post('order/checkout', {}).subscribe(
        (r) => {
          if (r['data'] != null) {
            console.log(r);
            this.checkoutData = new Checkout(r['data']);
            this.checkoutData.total = total;
            this.checkoutData.name = name;
            this.checkoutData.email = email;
            resolve();
          }
        },
        (e) => {
          this.customDialogService.openErrorDialog(e.error.message);
          reject(e);
        }
      );
    });
  }

  // async generateCheckoutToken(id: string): Promise<CheckoutData | null> {
  //   const response = null;
  //   return response ? new CheckoutData(response) : null;
  // }

  // async captureOrder(paymentId: string, checkoutToken: string) {
  //   try {
  //     // const response = await this.commerceService.commerce.checkout.capture(checkoutToken, {
  //     //   customer: {
  //     //     firstname: this.shipping.name,
  //     //     email: this.shipping.email,
  //     //   },
  //     //   shipping: {
  //     //     name: this.shipping.name,
  //     //     street: this.shipping.street,
  //     //     town_city: this.shipping.town,
  //     //     country: 'MY',
  //     //   },
  //     //   fulfillment: {
  //     //     shipping_method: this.checkoutData.shippingMethod,
  //     //   },
  //     //   payment: {
  //     //     gateway: 'stripe',
  //     //     stripe: {
  //     //       payment_method_id: paymentId,
  //     //     },
  //     //   },
  //     // });
      
  //     // const order = new Order(response);
  //     // this.order = order;
  //     // this.checkoutData = null;
  //     // this.cartService.clear();
  //     // this.userCartService.deleteCart();
  //     this.router.navigate(['/payment/success']);
  //   } catch (error) {
  //     this.checkoutData = null;
  //     this.router.navigate(['/payment/error']);
  //   }
  // }
}
