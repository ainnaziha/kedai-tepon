import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  providers: [NgbCarouselConfig] 
})
export class BannersComponent{
  name = 'Angular ' + VERSION.major;
  
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

}
