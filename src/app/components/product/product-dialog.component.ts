import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
  })
  export class ProductDialogComponent {
    constructor(
        private cartService: CartService,
        @Inject(MAT_DIALOG_DATA) public data: { product: Product}
    ) {}

    addToCart(): void {
        this.cartService.addToCart(this.data.product);
      }
  }