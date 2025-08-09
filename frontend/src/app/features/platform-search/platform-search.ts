import { Component, effect, inject, input, signal } from '@angular/core';
import { PlatformService } from '../../services/platform-service';
import { Platform } from '../../models/platform.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { debouncedSignal } from '../../utility/debouncedSignal';

@Component({
  selector: 'platform-search',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './platform-search.html',
  styleUrl: './platform-search.scss'
})
export class PlatformSearch {
  private platformService = inject(PlatformService);

  displayedColumns: string[] = ['name'];

  searchString = signal("");
  debouncedSearchString = debouncedSignal(this.searchString, 500);
  

  test: Platform = {
    type: "station",
    location: {
      type: "location",
      id: "9999",
      latitude: 123,
      longitude: 456,
    },
    id: "8888",
    name: "Lübeck"
  }
  platformData: Platform[] = [
    this.test
  ];


  constructor() {
    effect(async () => {
      const searchTerm = this.debouncedSearchString();
      if (searchTerm !== "") {
        await this.platformService.searchForPlatformByName(searchTerm).subscribe(platforms => {
          this.platformData = platforms;
        });
      }
      
    });

  }

  async ngOnInit() {
    console.log("hier");


    this.searchString.set("test");
  }
}
