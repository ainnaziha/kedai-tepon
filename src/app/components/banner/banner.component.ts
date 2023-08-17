import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  public items: GalleryItem[] = [
    new ImageItem({ src: 'https://static7.depositphotos.com/1015060/698/i/600/depositphotos_6980278-stock-photo-traffic-jam-mirror.jpg', thumb: 'https://static7.depositphotos.com/1015060/698/i/600/depositphotos_6980278-stock-photo-traffic-jam-mirror.jpg' }),
    new ImageItem({ src: 'https://static7.depositphotos.com/1015060/698/i/600/depositphotos_6980278-stock-photo-traffic-jam-mirror.jpg', thumb: 'https://static7.depositphotos.com/1015060/698/i/600/depositphotos_6980278-stock-photo-traffic-jam-mirror.jpg' }),
  ];
}
