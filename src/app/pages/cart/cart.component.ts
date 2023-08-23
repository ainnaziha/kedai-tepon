import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { ErrorDialogService } from 'src/app/services/error-dialog/error-dialog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private errorDialogService: ErrorDialogService,
    private router: Router,
    private checkoutService: CheckoutService
   ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  isChecking: boolean = false; 

  ngOnInit() {
    this.cartService.getCartItems();
  }

  get total(): string {
    return this.cartService.subTotal?.formattedWithSymbol ?? '';
  }

  get cartAvailable(): boolean {
    return (this.cartService.cart?.total_items ?? []) > 0;
  }

  async checkOut() {
    this.isChecking = true;
     
    try {
      const response = await this.checkoutService.generateCheckoutToken(this.cartService.cart.id);
      this.checkoutService.setCheckoutData(response);
      this.router.navigate(['/checkout/1', response.id]);
    } catch (e) {
      this.errorDialogService.openDialog(e.message);
    } finally {
      this.isChecking = false;
    }
  }
  
  get isLoading(): boolean {
    return this.cartService.isLoading;
  } 

  get cartItems(): CartItem[] {
    return this.cartService.cartItems;
  }
}