import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data: { errorMessage }
    });
  }

  openFirebaseAuthErrorDialog(error: any): void {
    let errorMessage = error.message;

    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid password. Please check your credentials.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email. Please check your email.';
        case 'auth/email-already-exists':
          errorMessage = 'Registration error. Email already registered.'
      }
    }

    this.openDialog(errorMessage);
  }
}
