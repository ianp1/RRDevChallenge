import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '../../services/platform-service';

@Component({
  selector: 'app-platform-details',
  imports: [],
  templateUrl: './platform-details.html',
  styleUrl: './platform-details.scss'
})
export class PlatformDetails {
  private activatedRoute = inject(ActivatedRoute);
  platformService = inject(PlatformService);
  platformId = signal('');

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.platformId.set(params['platformId']);
    });

    effect(() => {
      this.platformService.getDepartures(this.platformId());
    })
  }
}
