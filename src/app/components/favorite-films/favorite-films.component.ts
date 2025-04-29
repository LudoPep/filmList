import { Component, OnInit } from '@angular/core';
import { FilmModel, FilmsStore } from '../../state/film.store';
import { FilmsQuery } from '../../state/film.query';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { toggleExpandedOverview, truncateOverview } from '../../utils/helper';

@Component({
  selector: 'app-favorite-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-films.component.html',
  styleUrl: './favorite-films.component.scss'
})
export class FavoriteFilmsComponent implements OnInit {
  favoriteFilms$!: Observable<FilmModel[]>;
  isExpanded: { [key: number]: boolean } = {};

  constructor(
    private filmsQuery: FilmsQuery,
    private filmsStore: FilmsStore,
  ) {}

  ngOnInit(): void {
    this.favoriteFilms$ = this.filmsQuery.selectFavorites$;
  }

  toggleFavorite(film: FilmModel) {
    this.filmsStore.toggleFavorite(film.id);
  }

  onToggle(id: number) {
      this.isExpanded = toggleExpandedOverview(this.isExpanded, id);;
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

  getTruncatedOverview(text: string): string {
      return truncateOverview(text);
  }

}
