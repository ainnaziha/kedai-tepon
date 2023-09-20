import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: Category[] = [];

  isLoading: boolean = false;

  constructor(
    private httpService: HttpService,
  ) {}

  getCategories() {
    this.isLoading = true;

    this.httpService.get('category').subscribe(
      (r) => {
        if (Array.isArray(r)) {
          this.categories = r.map((item) => new Category(item));
        }
        this.isLoading = false;
      },
      (_) => {
        this.isLoading = false;
      }
    );
  }
}