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

  async checkout(total: string, name: string, email: string, cartIds: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.post('order/checkout', {}).subscribe(
        (r) => {
          if (r['data'] != null) {
            this.checkoutData = new Checkout(r['data']);
            this.checkoutData.total = total;
            this.checkoutData.name = name;
            this.checkoutData.email = email;
            this.checkoutData.cartIds = cartIds;
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

  async completeOrder(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.put(`order/${this.checkoutData.id}/complete`, this.checkoutData).subscribe(
        (r) => {
          this.router.navigate(['/payment/success']);
        },
        (e) => {
          this.checkoutData = null;
          this.router.navigate(['/payment/error']);
        }
      );
    });
  }
}
