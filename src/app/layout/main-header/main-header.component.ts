import { Component } from '@angular/core';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
