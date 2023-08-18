import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/firebase/auth.service'

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }
  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']); // Replace '/auth/login' with your actual login route
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.SignOut();
  }
}
