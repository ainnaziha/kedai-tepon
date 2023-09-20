import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog.component';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomDialogService } from 'src/app/services/custom-dialog/custom-dialog.service';
  
  @Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
  })
  export class ProductCardComponent {
    constructor(
      public cartService: CartService,
      private dialog: MatDialog,
      private authService: AuthService,
      private customDialogService: CustomDialogService,
    ) {}

    @Input() product: Product;

    async addToCart(): Promise<void> {
      if (this.authService.isLoggedIn) {
        this.product.isLoading = true;
        try {
          await this.cartService.addToCart(this.product.id);
        } finally {
          this.product.isLoading = false;
        }
      } else {
        this.customDialogService.openErrorDialog('You need to be logged in to add to cart.');
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