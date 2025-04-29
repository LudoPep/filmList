import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Film } from '../interfaces/film';
import { FilmWithImages } from '../interfaces/filmWithImages';
import { FilmsStore } from '../state/film.store';
import { FilmModel } from '../interfaces/filmModel';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  filmsEndpoint = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  imageBaseUrl = 'https://api.themoviedb.org/3/movie';

  constructor(
    private http: HttpClient,
    private filmsStore: FilmsStore,

  ) { }

  public getFilms(): Observable<FilmWithImages[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzI0MzkyZjE1YmM4YWI1NTkyNTgyMjI4ZGRhYzQxYiIsIm5iZiI6MTc0NTU3MDA1My42NjksInN1YiI6IjY4MGI0OTA1MTVhMWQ1YTYxNGFiNTljYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DhBSKcCwolxGqbvSRx1D2qUKXNE2QcKwZln15LdUa2s`);
    const filmsEndpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    
    return this.http.get< {results: FilmModel[]} >(filmsEndpoint, { headers, observe: 'response', responseType: 'json' }).pipe(
      switchMap(res => {
        const films = res.body?.results ?? [];
  
        const imageRequests = films?.map(film =>
          this.http.get<any>(`${this.imageBaseUrl}/${film.id}/images`, { headers }).pipe(
            map(images => ({ ...film, images }))
          )
        );
  
        return forkJoin(imageRequests); 
      }),
      tap(films => this.filmsStore.setFilms(films))
    );
  }
}