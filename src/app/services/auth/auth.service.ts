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
    this.httpService.post('auth/login', {'email': email, 'password': password}).subscribe(
      (response) => {
        if (response['data'] != null) {
          const user = new User(response['data']);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorDialogService.openDialog(error.resppnse.message);
      }
    );
  }

  SignUp(email: string, password: string, name: string) {
    this.httpService.post('auth/register', {'email': email, 'password': password, 'name': name}).subscribe(
      (response) => {
        if (response['data'] != null) {
          const user = new User(response['data']);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorDialogService.openDialog(error.response.message);
      }
    );
  }

  SignOut() {
    // return this.afAuth.signOut().then(() => {
    //   localStorage.removeItem('user');
    // });
  }

  get getUser(): User | null {
    return JSON.parse(localStorage.getItem('user'));
  }
}