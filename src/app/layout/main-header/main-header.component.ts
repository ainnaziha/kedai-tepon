import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  constructor(private router: Router) { }
  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']); // Replace '/auth/login' with your actual login route
  }
}
