import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-pelicula',
  templateUrl: './slide-pelicula.component.html',
  styleUrls: ['./slide-pelicula.component.scss']
})
export class SlidePeliculaComponent implements OnInit {

  @Input() peliculas = [];
  @Input() titulo;
  constructor() { }

  ngOnInit() { }

}
