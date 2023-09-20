import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public isLoggingIn = false;
  public isRegistering = false;

  constructor(
    public router: Router,
    private errorDialogService: ErrorDialogService,
    private httpService: HttpService,
  ) {}
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && this.isTokenExpired(user)) {
      localStorage.removeItem('user');
      return false;
    }
    return user !== null;
  }

  SignIn(email: string, password: string) {
    this.isLoggingIn = true;

    this.httpService.post('auth/login', {'email': email, 'password': password}).subscribe(
      (r) => {
        if (r['data'] != null) {
          const user = new User(r['data']);
          localStorage.setItem('user', JSON.stringify(user));
          this.isLoggingIn = false;
          this.router.navigate(['/home']);
        }
      },
      (e) => {
        this.isLoggingIn = false;
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }

  SignUp(email: string, password: string, name: string) {
    this.isRegistering = true;

    this.httpService.post('auth/register', {'email': email, 'password': password, 'name': name}).subscribe(
      (r) => {
        if (r['data'] != null) {
          const user = new User(r['data']);
          localStorage.setItem('user', JSON.stringify(user));
          this.isRegistering = false;
          this.router.navigate(['/home']);
        }
      },
      (e) => {
        this.isRegistering = false;
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }

  SignOut() {
    this.httpService.post('auth/logout', {});
    localStorage.removeItem('user');
  }

  get getUser(): User | null {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && this.isTokenExpired(user)) {
      localStorage.removeItem('user');
      return null;
    }
    return user;
  }

  private isTokenExpired(user: User): boolean {
    if (!user || !user.expiry) {
      return true;
    }
    
    const now = new Date();
    const expirationDate = new Date(user.expiry);
  
    return now >= expirationDate;
  }
}