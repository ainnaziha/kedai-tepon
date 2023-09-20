import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  description: string;
  onYesClick: () => void;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string, onYesClick: () => void }) {
    this.description = data.description;
    this.onYesClick = data.onYesClick;
  }

  onYesButtonClicked() {
    if (this.onYesClick) {
      this.onYesClick();
    }
  }
}