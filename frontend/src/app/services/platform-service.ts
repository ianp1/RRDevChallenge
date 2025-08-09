import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {  
  private http = inject(HttpClient);

  searchForPlatformByName(name:string) {
    return this.http.get('http://localhost:3000/platforms/ByName/'+name);
  }
}

