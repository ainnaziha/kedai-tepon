import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "src/app/models/product.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { CartService } from "src/app/services/cart/cart.service";
import { ErrorDialogService } from "src/app/services/error-dialog/error-dialog.service";

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
  })
  export class ProductDialogComponent {
    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private errorDialogService: ErrorDialogService,
        @Inject(MAT_DIALOG_DATA) public data: { product: Product}
    ) {}

    async addToCart(): Promise<void> {
      if (this.authService.isLoggedIn) {
        this.data.product.isLoading = true;
        try {
          await this.cartService.addToCart(this.data.product.id);
        } finally {
          this.data.product.isLoading = false;
        }
      } else {
        this.errorDialogService.openDialog('You need to be logged in to add to cart.');
      }
    }
  }