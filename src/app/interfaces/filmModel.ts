import { FilmWithImages } from "./filmWithImages";

export interface FilmModel extends FilmWithImages {
    isFavorite: boolean;
    inWatchlist: boolean;
  }