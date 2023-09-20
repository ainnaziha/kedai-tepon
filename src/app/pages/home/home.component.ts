import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public categoryService: CategoryService,
    public productService: ProductService
    ) {}

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.productService.getProduct(null);
  } 

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isLoading(): boolean {
    return this.productService.isLoading;
  }

  onSelectCategory(categoryId: number | null) {
    this.productService.getProduct(categoryId);
  }
}
