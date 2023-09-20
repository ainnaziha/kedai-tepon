import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    public cartService: CartService
   ) {}
  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.cartService.getTotalCart();
    }
  }

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
    this.router.navigate(['']);
  }
}
