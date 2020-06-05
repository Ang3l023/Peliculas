import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.scss']
})
export class ListaPeliculasComponent implements OnInit {

  numPage = 1;
  @Input() peliculas: Pelicula[] = [];
  @Input() carga = true;
  @Input() titulo = '';
  @Output() propagar = new EventEmitter<number>();
  @Input() paginacion = true;
  constructor() { }

  ngOnInit() {
    this.propagar.emit(this.numPage);
    this.numPage++;
  }

  cargarMas() {
    this.propagar.emit(this.numPage);
    this.numPage++;
  }

}
