import { Component, inject } from '@angular/core';
import { PlatformService } from '../../services/platform-service';

@Component({
  selector: 'platform-search',
  imports: [],
  templateUrl: './platform-search.html',
  styleUrl: './platform-search.scss'
})
export class PlatformSearch {
  private platformService = inject(PlatformService);


  async ngOnInit() {
    console.log("hier");
    const platforms = await this.platformService.searchForPlatformByName("Lüb").toPromise();
    console.log(platforms);
  }
}
