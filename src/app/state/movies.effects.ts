import { MoviesService } from '../services/movies.service';
import { MoviesStore } from './movies.store';
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MoviesEffects {
    constructor(
        private moviesStore: MoviesStore,
        private moviesService: MoviesService
    ) {}

    readonly getMovies = this.moviesStore.effect((trigger$: Observable<{}>) => {
        return trigger$.pipe(
            switchMap(() => {
                return this.moviesService.getAllMovies().pipe(
                    map((httpResponse) => {
                        Object.keys(httpResponse).forEach((item) => {
                          this.moviesStore.addMovie(httpResponse[item])
                        });
                    }),
                    catchError((error: any) => {
                        console.log(error);

                        return EMPTY;
                    })
                );
            })
        );
    });
}
