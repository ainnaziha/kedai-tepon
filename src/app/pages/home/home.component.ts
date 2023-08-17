import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../../services/commerceJS/commerce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  products: any[]; // Adjust the type based on Commerce.js response

  constructor(private commerceService: CommerceService) {}

  ngOnInit(): void {
    this.commerceService.commerce.products.list().then((response) => {
      this.products = response.data;
      console.log('Products:', this.products); 
    });
  }

}
