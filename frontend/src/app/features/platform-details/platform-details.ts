import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PlatformService } from '../../services/platform-service';
import { Departure } from '../../models/departure.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Platform } from '../../models/platform.model';
import { DatePipe } from '@angular/common';
import { Arrival } from '../../models/arrival.model';
import { debouncedSignal } from '../../utility/debouncedSignal';

@Component({
  selector: 'app-platform-details',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './platform-details.html',
  styleUrl: './platform-details.scss'
})
export class PlatformDetails {
  private activatedRoute = inject(ActivatedRoute);
  platformService = inject(PlatformService);

  platformId = signal('');
  platformData:Platform | undefined = undefined;

  duration = signal(60);
  debouncedDuration = debouncedSignal(this.duration, 500);

  departureData: Departure[] = [];
  arrivalData: Arrival[] = [];
  displayedDepartureColumns = [
    "departureTime",
    "direction",
    "line",
    "station",
    "delay"
  ];
  displayedArrivalColumns = [
    "arrivalTime",
    "provenance",
    "line",
    "station",
    "delay"
  ];

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.platformId.set(params['platformId']);
    });

    effect(() => {
      if (this.debouncedDuration() <= 720 && this.debouncedDuration() > 0) {
        this.platformService.searchForPlatformByName(this.platformId()).subscribe(platforms => {
          //Since we are searching by id, we should only receive one result
          // -> Ignore others
          if (platforms.length >= 1) {
            this.platformData = platforms[0];
          }
        });
        this.platformService.getDepartures(this.platformId(), this.debouncedDuration()).subscribe(departures => {
          this.departureData = departures;
        });
        this.platformService.getArrivals(this.platformId(), this.debouncedDuration()).subscribe(arrivals => {
          this.arrivalData = arrivals;
        });
      }
    })
  }
}
