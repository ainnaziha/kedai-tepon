import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(private dialog: MatDialog) { }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data: { errorMessage }
    });
  }

  openConfirmationDialog(description: string, onYesClick: () => void): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { description, onYesClick }
    });
  }
}
