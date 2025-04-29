import { Injectable } from '@angular/core';
import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { FilmWithImages } from '../interfaces/filmWithImages';

export interface FilmModel extends FilmWithImages {
  id: number;
  title: string;
  isFavorite?: boolean;
  inWatchlist?: boolean;
}

export interface FilmsState extends EntityState<FilmModel> {}

const FAVORITE_KEY = 'favoriteFilms';
const WATCHLIST_KEY = 'watchlistFilms';

@StoreConfig({ name: 'films' })
@Injectable({ providedIn: 'root' })
export class FilmsStore extends EntityStore<FilmsState, FilmModel> {
  constructor() {
    super();
    this.loadFavoritesFromStorage();
    this.loadWatchlistFromStorage();
  }

  setFilms(films: FilmModel[]) {
    const current = this.getValue().entities ?? {};
    const updated = films.map(film => ({
      ...film,
      isFavorite: current[film.id]?.isFavorite ?? false,
      inWatchlist: current[film.id]?.inWatchlist ?? false
    }));
    this.upsertMany(updated);
  }

  toggleFavorite(filmId: number) {
    const entities = this.getValue().entities;
    if (entities && entities[filmId]) {
      const film = entities[filmId];
      this.update(filmId, { isFavorite: !film.isFavorite });
      this.saveFavoritesToStorage();
    }
  }

  toggleWatchlist(filmId: number) {
    const entities = this.getValue().entities;
    if (entities && entities[filmId]) {
      const film = entities[filmId];
      this.update(filmId, { inWatchlist: !film.inWatchlist });
      this.saveWatchlistToStorage();
    }
  }

  private saveFavoritesToStorage() {
    const favorites = Object.values(this.getValue().entities ?? {}).filter(f => f.isFavorite);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  }

  private saveWatchlistToStorage() {
    const watchlist = Object.values(this.getValue().entities ?? {}).filter(f => f.inWatchlist);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }

  private loadFavoritesFromStorage() {
    const data = localStorage.getItem(FAVORITE_KEY);
    if (!data) return;
    const favorites: FilmModel[] = JSON.parse(data);
    favorites.forEach(film => this.upsert(film.id, { ...film, isFavorite: true }));
  }

  private loadWatchlistFromStorage() {
    const data = localStorage.getItem(WATCHLIST_KEY);
    if (!data) return;
    const watchlist: FilmModel[] = JSON.parse(data);
    watchlist.forEach(film => this.upsert(film.id, { ...film, inWatchlist: true }));
  }
}