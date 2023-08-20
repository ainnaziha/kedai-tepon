import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog.component';
import { Product } from 'src/app/models/product.model';
  
  @Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
  })
  export class ProductCardComponent {
    constructor(
      public cartService: CartService,
      private dialog: MatDialog
    ) {}

    @Input() product: Product;

    async addToCart(): Promise<void> {
      this.product.isLoading = true;
      console.log(this.product.isLoading);
      try {
        await this.cartService.addToCart(this.product);
      } finally {
        this.product.isLoading = false;
        console.log(this.product.isLoading);
      }
    }

    openProductDetail() {
      this.dialog.open(ProductDialogComponent, {
        data: {
          product: this.product,
        },
        width: '500px',
      });
    }
  }