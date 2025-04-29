import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmModel, FilmsStore } from '../../state/film.store';
import { FilmsQuery } from '../../state/film.query';
import { FilmsService } from '../../services/films.service';
import { CommonModule } from '@angular/common';
import { toggleExpandedOverview, truncateOverview } from '../../utils/helper';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  films$!: Observable<FilmModel[]>;
  favorites$!: Observable<FilmModel[]>;
  watchlist$!: Observable<FilmModel[]>;
  isExpanded: { [key: number]: boolean } = {};

  constructor(
    private filmService: FilmsService,
    private filmsStore: FilmsStore,
    private filmsQuery: FilmsQuery,
  ) {}

  ngOnInit(): void {
    this.getFilms();
    this.favorites$ = this.filmsQuery.selectFavorites$;
    this.watchlist$ = this.filmsQuery.selectWatchlist$;
  }

  getFilms() {
    this.filmService.getFilms().subscribe(films => {
      this.filmsStore.setFilms(films);
    });
    this.films$ = this.filmsQuery.selectAll();
  }

  onToggle(id: number) {
      this.isExpanded = toggleExpandedOverview(this.isExpanded, id);;
  }

  getTruncatedOverview(text: string): string {
      return truncateOverview(text);
  }

  toggleFavorite(film: FilmModel) {
    this.filmsStore.toggleFavorite(film.id);
  }

  isFavorite(film: FilmModel): boolean {
    return film.isFavorite ?? false;
  }

  toggleWatchlist(film: FilmModel) {
    this.filmsStore.toggleWatchlist(film.id);
  }

  isInWatchlist(film: FilmModel): boolean {
    return film.inWatchlist ?? false;
  }
}