import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Product } from 'src/app/models/product.model';
import { ImageItem } from 'ng-gallery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: Product[] = [];
  public carouselItems: ImageItem[] = [];

  isLoading: boolean = false;

  constructor(
    private httpService: HttpService,
  ) {}

  getProduct(categoryId: number | null) {
    this.isLoading = true;
    this.httpService.get(`product?categoryId=${categoryId ?? ''}`).subscribe(
      (r) => {
        if (Array.isArray(r)) {
          this.products = r.map((item) => new Product(item));
        }
        if (this.carouselItems.length == 0) {
          this.carouselItems = this.products.map((product) => {
            return new ImageItem({
              src: product.image,
              thumb: product.image,
            });
          });
        }
        this.isLoading = false;
      },
      (_) => {
        this.isLoading = false;
      }
    );
  }
}