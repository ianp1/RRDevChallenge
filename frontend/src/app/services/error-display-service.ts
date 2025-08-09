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
    let rawError:any = error;
    
    var errorMessage = "";
    var errorTitle = "";

    //Unfortunately, the http errors are not strictly typed. 
    // Thats why we need to construct the object in this way to recover eventual error messages
    if (Object.hasOwn(rawError, "error")) {
      if (Object.hasOwn(rawError["error"], "error")) {
        if (rawError["error"]["error"] === "Gateway Timeout") {
          errorMessage = rawError["error"]["message"];
          errorTitle = "DB Serverfehler";
        }
      }
    }
    console.log(rawError['error']['error']);
    //console.log(rawError.error)
    if (errorTitle=== "") {
      if (error instanceof ValidationError) {
        errorTitle = "Kommunikationsfehler";
        errorMessage = "Beim Abrufen der Daten vom Server ist ein Fehler aufgetreten. Die erhaltenen Daten stimmen nicht mit dem erwarteten Format überein. Eventuell sind die Versionen inkompatibel";
      } else if (error instanceof Error){
        errorTitle = "Unerwarteter Fehler";
        errorMessage = `${JSON.stringify(error.message)}
        
        Stack: ${error.stack}`;
      } else {
        errorTitle = "Unerwarteter Fehler";
        errorMessage = JSON.stringify(error);
      }

    }


    console.log(errorMessage);
    this.dialog.open(ErrorDisplayDialog, {
      data: {
        message: errorMessage,
        title: errorTitle
      }
    })

  }
}
