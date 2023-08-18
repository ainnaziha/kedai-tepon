import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

  
  @Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
  })
  export class ProductCardComponent {
    constructor(
      public cartService: CartService
      ) {}

    @Input() product: any;

    addToCart(product: any): void {
      this.cartService.addToCart(product, 1);
    }
  }