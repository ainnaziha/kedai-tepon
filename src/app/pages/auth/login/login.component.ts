import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  userEmail: string = ''; userPassword: string = '';

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {}

  signIn() {
    if (this.userEmail && this.userPassword) {
      this.authService.SignIn(this.userEmail, this.userPassword);
    }
  }
}