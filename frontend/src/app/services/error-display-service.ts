import { inject, Injectable } from '@angular/core';
import { ValidationError } from 'runtypes';
import { ErrorDisplayDialog } from './error-display-dialog/error-display-dialog';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorDisplayService {
  dialog = inject(MatDialog);


  displayError(error: Error | string) {
    //In production, this could be replaced with an optional telemetrics service, collecting error information from clients 
    console.log("An Error occured:");
    console.log(error);
    
    var errorMessage = "";
    var errorTitle = "";
    if (error instanceof ValidationError) {
      errorTitle = "Kommunikationsfehler";
      errorMessage = "Beim Abrufen der Daten vom Server ist ein Fehler aufgetreten. Die erhaltenen Daten stimmen nicht mit dem erwarteten Format überein. Eventuell sind die Versionen inkompatibel";
    } else if (error instanceof Error){
      errorTitle = "Unerwarteter Fehler";
      errorMessage = `${error.message}
      
      Stack: ${error.stack}`;
    } else {
      errorTitle = "Unerwarteter Fehler";
      errorMessage = error;
    }

    console.log(errorMessage);
    var dialogRef = this.dialog.open(ErrorDisplayDialog, {
      data: {
        message: errorMessage,
        title: errorTitle
      }
    })

  }
}
