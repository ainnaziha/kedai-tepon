import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../../services/commerce-js/commerce.service';
import { Product } from 'src/app/models/product.model';
import { ImageItem } from 'ng-gallery';
import { AuthService } from '../../services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  items: ImageItem[];

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService,
    private cartService: CartService,
    ) {}

  ngOnInit(): void {
    this.commerceService.commerce.products.list().then((response) => {
      this.products = response.data.map((productData) => new Product(productData));
      this.items = this.products.map((product) => {
        return new ImageItem({
          src: product.imageUrl,
          thumb: product.imageUrl,
        });
      });
    });
  } 

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isLoading(): boolean {
    return this.cartService.isLoading;
  }
}
