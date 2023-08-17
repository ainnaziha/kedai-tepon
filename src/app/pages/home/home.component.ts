import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../../services/commerceJS/commerce.service';
import { Product } from 'src/app/models/product.model';
import { ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  items: ImageItem[];

  constructor(private commerceService: CommerceService) {}

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
}
