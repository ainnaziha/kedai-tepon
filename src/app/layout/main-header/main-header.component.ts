import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    public cartService: CartService
   ) { }

  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.SignOut();
    this.cartService.clear();
  }
}
