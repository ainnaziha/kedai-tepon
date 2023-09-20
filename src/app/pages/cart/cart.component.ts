import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { CustomDialogService } from 'src/app/services/custom-dialog/custom-dialog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private customDialogService: CustomDialogService,
    private router: Router,
    private checkoutService: CheckoutService,
    private authService: AuthService,
   ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  isChecking: boolean = false; 

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.cartService.getCart();
    }
  }

  get total(): string {
    return this.cartService.cart.total;
  }

  get cartAvailable(): boolean {
    return this.cartService.cart.items.length > 0;
  }

  async checkOut() {
    this.isChecking = true;
     
    try {
      const response = await this.checkoutService.generateCheckoutToken('');
      this.checkoutService.setCheckoutData(response);
      this.router.navigate(['/checkout/1', response.id]);
    } catch (e) {
      this.customDialogService.openErrorDialog(e.message);
    } finally {
      this.isChecking = false;
    }
  }

  clearCart(): void {
    this.customDialogService.openConfirmationDialog(
      'Are you sure you want to empty the cart?', 
      () => this.cartService.deleteCart(),
    );
  }
  
  get isLoading(): boolean {
    return this.cartService.isLoading;
  } 

  get isDeleting(): boolean {
    return this.cartService.isDeleting;
  } 

  get cartItems(): CartItem[] {
    return this.cartService.cart.items;
  }
}