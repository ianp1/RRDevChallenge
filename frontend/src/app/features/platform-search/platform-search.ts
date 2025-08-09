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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterLink, RouterModule } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'platform-search',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    MatProgressSpinner,
    RouterLink,
    RouterModule
  ],
  templateUrl: './platform-search.html',
  styleUrl: './platform-search.scss'
})
export class PlatformSearch {
  private platformService = inject(PlatformService);

  displayedColumns: string[] = ['name'];

  searchString = signal("");
  loading = signal(false);
  debouncedSearchString = debouncedSignal(this.searchString, 500);
  
  platformData: Platform[] = [];


  constructor() {
    effect(() => {
      const searchTerm = this.debouncedSearchString();
      this.loading.set(true);
      if (searchTerm !== "") {
        this.platformService.searchForPlatformByName(searchTerm).subscribe(platforms => {
          this.platformData = platforms;
          this.loading.set(false);
        });
      } else {
        this.loading.set(false);
      }
      
    });

  }

}
