import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmModel, FilmsStore } from '../../state/film.store';
import { FilmsQuery } from '../../state/film.query';
import { CommonModule } from '@angular/common';
import { toggleExpandedOverview, truncateOverview } from '../../utils/helper';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss'
})
export class WatchListComponent implements OnInit {
  watchlistFilms$!: Observable<FilmModel[]>;
  isExpanded: { [key: number]: boolean } = {};

  constructor(
    private filmsQuery: FilmsQuery,
    private filmsStore: FilmsStore,
  ) {}

  ngOnInit(): void {
    this.watchlistFilms$ = this.filmsQuery.selectWatchlist$;
  }

  toggleWatchlist(film: FilmModel) {
    this.filmsStore.toggleWatchlist(film.id);
  }

  isInWatchlist(film: FilmModel): boolean {
    return film.inWatchlist ?? false;
  }

  toggleFavorite(film: FilmModel) {
    this.filmsStore.toggleFavorite(film.id);
  }
  
  isFavorite(film: FilmModel): boolean {
    return film.isFavorite ?? false;
  }

  onToggle(id: number) {
    this.isExpanded = toggleExpandedOverview(this.isExpanded, id);;
  }

  getTruncatedOverview(text: string): string {
    return truncateOverview(text);
  }

}
