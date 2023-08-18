import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent implements OnInit {
  totalCart: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
   ) { }
  async ngOnInit(): Promise<void> {
    this.totalCart = (await this.cartService.getCartItems()).length;
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
  }
}
