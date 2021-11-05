import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

export interface Movie {
  id?: number;
  name: string;
}

export interface MoviesState {
  movies: Movie[];
}

@Injectable({ providedIn: 'root' })
export class MoviesStore extends ComponentStore<MoviesState> {

  constructor() {
    super( { movies: [] } )
  }

  readonly movies$: Observable<Movie[]> = this.select(state => state.movies);

  readonly addMovie = this.updater((state, movie: Movie) => ({
    movies: [...state.movies, movie]
  }));

  readonly editMovie = this.updater((state, movie: Movie) => {
    let actualMovie = state.movies.find(item => item.id === movie.id);
    actualMovie.name = movie.name;

    return state;
  });

  readonly removeMovie = this.updater((state, movie: Movie) => {
    let movies = state.movies.filter(item => item.id !== movie.id);
    state.movies = movies

    return state;
  });
}
