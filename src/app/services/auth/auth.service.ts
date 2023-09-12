import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
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
    return JSON.parse(localStorage.getItem('user'));
  }
}