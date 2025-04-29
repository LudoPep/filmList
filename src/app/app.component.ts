import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LandingPageComponent,
    FavoriteFilmsComponent,
    WatchListComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'filmList';
}
