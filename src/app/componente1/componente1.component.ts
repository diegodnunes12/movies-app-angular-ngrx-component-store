import { MoviesStore, Movie } from '../state/movies.store';
import { MoviesService } from '../services/movies.service';
import { MoviesEffects } from '../state/movies.effects';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.scss']
})
export class Componente1Component implements OnInit {

  movies$ = this.moviesStore.movies$;
  form: FormGroup;
  showFormNewMovie: boolean = false;

  constructor(private moviesStore: MoviesStore, private fb: FormBuilder, private moviesEffects: MoviesEffects, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesEffects.getMovies({});
    this.form = this.fb.group({
      id: [],
      name: []
    })
  }

  onSubmit() {
    const id = this.form.get('id').value;
    const movie: Movie = {
      name: this.form.get('name').value
    }
    if(id) {
      this.moviesService.updateMovie(movie, id).subscribe(httpResponse => {
        this.moviesStore.editMovie(httpResponse);
        this.showFormNewMovie = false;
        this.form.reset();
      });
    } else {
      this.moviesService.insertMovie(movie).subscribe(httpResponse => {
        this.moviesStore.addMovie(httpResponse);
        this.showFormNewMovie = false;
        this.form.reset();
      });
    }
  }

  editMovie(movie: Movie) {
    this.showFormNewMovie = true;
    this.form.get('id').setValue(movie.id);
    this.form.get('name').setValue(movie.name);
  }

  remover(movie: Movie) {
    this.moviesService.deleteMovie(movie.id).subscribe(() => {
      this.moviesStore.removeMovie(movie);
    });
  }

  newMovie() {
    this.showFormNewMovie = true;
  }

  cancel() {
    this.form.reset();
    this.showFormNewMovie = false;
  }

}
