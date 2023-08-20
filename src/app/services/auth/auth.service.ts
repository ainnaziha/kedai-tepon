import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { User } from 'src/app/models/user.model';
import { Observable, map } from 'rxjs';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userData: User | null;
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private errorDialogService: ErrorDialogService
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.userData = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    });
  }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((_) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/home']);
          }
        });
      })
      .catch((error) => {
        this.errorDialogService.openFirebaseAuthErrorDialog(error);
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((_) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/home']);
          }
        });
      })
      .catch((error) => {
        this.errorDialogService.openFirebaseAuthErrorDialog(error);
      });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  GoogleAuth() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
    .then((_) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['/home']);
        }
      });
    })
    .catch((error) => {
      this.errorDialogService.openFirebaseAuthErrorDialog(error);
    });
  }

  get getUser(): User | null {
    return JSON.parse(localStorage.getItem('user')!);
  }
}