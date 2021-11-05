import { FormGroup, FormBuilder } from '@angular/forms';
import { MoviesStore } from './../state/movies.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.scss']
})
export class Componente2Component implements OnInit {

  movies$ = this.moviesStore.movies$;

  constructor( private moviesStore: MoviesStore ) { }

  ngOnInit(): void {
  }
}
