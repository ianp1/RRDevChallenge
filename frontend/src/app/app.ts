import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformSearch } from './features/platform-search/platform-search';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    FormsModule

  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  location:Location = inject(Location);
  protected readonly title = signal('DevChallenge');
}
