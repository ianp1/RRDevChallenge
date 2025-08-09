import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { catchError, filter, map, Observable, ObservableInput, of } from 'rxjs';
import { PlatformValidator, Platform } from '../models/platform.model';
import { ErrorDisplayService } from './error-display-service';
import { Departure, DepartureValidator } from '../models/departure.model';
import { Arrival, ArrivalValidator } from '../models/arrival.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {  
  private http = inject(HttpClient);
  private errorDisplayService = inject(ErrorDisplayService);

  errorHandler<T>() {
    return catchError<T[], ObservableInput<T[]>>(error => {
      //Ideally, this error handling would be made on a per-item base instead of globally. This way, we could at least display all working rows
      // -> Omitted to keep it brief
      this.errorDisplayService.displayError(error);        
  
      const result:T[] = [];
      return of(result);
    });
  }

  searchForPlatformByName(name:string):Observable<(Platform)[]> {
    return this.http.get('http://localhost:3000/platforms/ByName/'+name).pipe(
      map((responseValue => {
        if (Array.isArray(responseValue)) {
          return responseValue.map(
            platformResponseValue => PlatformValidator.check(platformResponseValue)
          ).filter(platform => {
            //Filter to exclude irrelevant stations
            // -> Stations that only include bus stops, tram stations, cab stations, etc.
            //return true;
            return platform.products.nationalExpress || platform.products.national || platform.products.regionalExpress || platform.products.regional;
          });
        }

        return [];
      })),
      this.errorHandler()
    );
  }

  getDepartures(platformId: string):Observable<Departure[]> {
    
    return this.http.get<DepartureResponse>(`http://localhost:3000/platforms/${platformId}/Departures?startTime=1754759689&duration=60`).pipe(
      map(responseValue => {
        if (Array.isArray(responseValue['departures'])) {
          return responseValue.departures.map(
            departureResponseValue => {

              return DepartureValidator.parse(departureResponseValue);  
            }
          );
        }
      
        return [];
      }),
      this.errorHandler()
    );
  }

  getArrivals(platformId: string): Observable<Arrival[]> {
    return this.http.get<ArrivalResponse>(`http://localhost:3000/platforms/${platformId}/Arrivals?startTime=1754759689&duration=60`).pipe(
      map(responseValue => {
        if (Array.isArray(responseValue['arrivals'])) {
          console.log(responseValue['arrivals']);
          return responseValue.arrivals.map(
            arrivalsResponseValue => {

              return ArrivalValidator.parse(arrivalsResponseValue);  
            }
          );
        }
      
        return [];
      }),
      this.errorHandler()
    );
  }
}

interface DepartureResponse {
  departures: any[]
}

interface ArrivalResponse {
  arrivals: any[]
}