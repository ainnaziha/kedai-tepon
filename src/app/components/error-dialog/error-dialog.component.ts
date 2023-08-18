import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent {
  errorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }) {
    this.errorMessage = data.errorMessage;
  }
}