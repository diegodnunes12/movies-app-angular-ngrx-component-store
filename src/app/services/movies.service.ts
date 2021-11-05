import { Observable } from 'rxjs';
import { Movie } from '../state/movies.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url: string = `http://localhost:3000/movies`;

  constructor(private http: HttpClient) { }

  insertMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie);
  }

  updateMovie(movie: Movie, id: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.url}/${id}`, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }
}
