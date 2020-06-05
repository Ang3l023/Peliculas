import { Component, OnInit, Input } from '@angular/core';

import { Pelicula } from '../../interfaces/pelicula';

import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  titulo = 'Peliculas Favoritas';
  cargar = true;
  peliculas: Pelicula[] = [];
  @Input() show = true;

  constructor(
    private servFavorites: FavoritesService
  ) {
    servFavorites.getFavs().subscribe(
      res => this.cargarFavoritos()
    );
  }

  ngOnInit(): void {
    if (!this.show) {
      this.titulo = '';
    }
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.cargar = false;
    this.peliculas = this.servFavorites.favoritos.peliculas;
  }

}
