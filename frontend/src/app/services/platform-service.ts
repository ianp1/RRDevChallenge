import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { catchError, map, Observable, of } from 'rxjs';
import { PlatformValidator, Platform } from '../models/platform.model';
import { ErrorDisplayService } from './error-display-service';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {  
  private http = inject(HttpClient);
  private errorDisplayService = inject(ErrorDisplayService);

  searchForPlatformByName(name:string):Observable<(Platform)[]> {
    return this.http.get('http://localhost:3000/platforms/ByName/'+name).pipe(
      map((responseValue => {
        if (Array.isArray(responseValue)) {
          return responseValue.map(platformResponseValue => {
            const platform = PlatformValidator.check(platformResponseValue);

            return platform;
          });
        }

        return [];
      })),
      catchError(error => {
        //Ideally, this error handling would be made on a per-item base instead of globally. This way, we could at least display all working rows
        // -> Omitted to keep it brief
        this.errorDisplayService.displayError(error);        

        return [];
      })
    );
  }
}

