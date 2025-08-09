import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-error-display-dialog',
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './error-display-dialog.html',
  styleUrl: './error-display-dialog.scss'
})
export class ErrorDisplayDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, title: string}) {
    console.log("open dialog", data);
  }


}
