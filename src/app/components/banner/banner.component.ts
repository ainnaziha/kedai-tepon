import { Component, Input, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  @Input() products: Product[] = [];

  generateGalleryItems(): GalleryItem[] {
    return this.products.map((product) => {
      return new ImageItem({
        src: product.imageUrl,
        thumb: product.imageUrl,
      });
    });
  }
}
