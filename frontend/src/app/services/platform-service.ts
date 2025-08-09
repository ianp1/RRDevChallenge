import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { catchError, map, of } from 'rxjs';
import { PlatformValidator } from '../models/platform.model';
import { ErrorDisplayService } from './error-display-service';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {  
  private http = inject(HttpClient);
  private errorDisplayService = inject(ErrorDisplayService);

  searchForPlatformByName(name:string) {
    return this.http.get('http://localhost:3000/platforms/ByName/'+name).pipe(
      map((responseValue => {
        console.log("mapped value: ", responseValue);
        if (Array.isArray(responseValue)) {
          return responseValue.map(platformResponseValue => {
            const platform = PlatformValidator.check(platformResponseValue);
            console.log("platform: ", platform);

            return platform;
          });
        }

        return undefined;
      })),
      catchError(error => {
        this.errorDisplayService.displayError(error);        

        return of([]);
      })
    );
  }
}

