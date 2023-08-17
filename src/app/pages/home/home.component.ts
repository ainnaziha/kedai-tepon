import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../../services/commerceJS/commerce.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private commerceService: CommerceService) {}

  ngOnInit(): void {
    this.commerceService.commerce.products.list().then((response) => {
      this.products = response.data.map((productData) => new Product(productData));
    });
  }
}
