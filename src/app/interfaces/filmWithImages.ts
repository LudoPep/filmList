import { Film } from "./film";

export interface FilmWithImages extends Film {
    images: {
      backdrops: any[];
      posters: any[];
      logos: any[];
    };
  }