import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FilmModel, FilmsState, FilmsStore } from './film.store';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilmsQuery extends QueryEntity<FilmsState, FilmModel> {
  constructor(protected override store: FilmsStore) {
    super(store);
  }

  selectFavorites$ = this.select(state => state.entities).pipe(
    map(entities => {
      return entities ? Object.values(entities).filter(film => film.isFavorite) : [];
    })
  );

  selectWatchlist$ = this.select(state => state.entities).pipe(
    map(entities => {
      return entities ? Object.values(entities).filter(film => film.inWatchlist) : [];
    })
  );
}