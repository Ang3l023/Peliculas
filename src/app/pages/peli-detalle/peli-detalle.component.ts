import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Pelicula } from '../../interfaces/pelicula';

import { MoviesService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-peli-detalle',
  templateUrl: './peli-detalle.component.html',
  styleUrls: ['./peli-detalle.component.scss']
})
export class PeliDetalleComponent implements OnInit {

  pelicula: Pelicula;
  favorito = false;
  peliculasRel: Pelicula[] = [];

  constructor(
    private actiRoute: ActivatedRoute,
    private servFavorito: FavoritesService,
    private servPeli: MoviesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.actiRoute.snapshot.params.id;
    this.servPeli
      .getPelicula(id)
      .subscribe(res => {
        this.pelicula = res;
        this.verificarPeli();
        this.getMoviesRelated();
      });
  }

  addFav() {
    this.servFavorito.saveFav(this.pelicula)
      .then(
        res => {
          this.verificarPeli();
        }
      );
  }

  delete() {
    this.servFavorito.deleteFav(this.pelicula)
      .then(
        res => {
          this.verificarPeli();
        }
      );
  }

  verificarPeli() {
    const peli = this.servFavorito.verificarFav(this.pelicula);
    if (peli) {
      this.favorito = true;
    } else {
      this.favorito = false;
    }
  }

  backPage() {
    this.location.back();
  }

  getMoviesRelated() {
    this.servPeli.getMoviesRelated(this.pelicula.id, 1)
      .subscribe(
        res => {
          if (res) {
            this.peliculasRel = res;
          }
        }
      );
  }

}
