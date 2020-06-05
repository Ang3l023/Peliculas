import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  cargar = true;
  pelisRecom: Pelicula[] = [];
  pelisPopulares: Pelicula[] = [];
  pelisEstrenos: Pelicula[] = [];

  constructor(
    private servPelis: MoviesService
  ) { }

  ngOnInit(): void {
    this.getPelisEstreno();
    this.getPelisPopulares();
  }

  getPelisRecomendadas(page: number) {
    this.cargar = true;
    this.servPelis.getMejorCalf(page)
      .subscribe(
        res => {
          this.pelisRecom = this.pelisRecom.concat( res );
          this.cargar = false;
        }
      );
  }

  getPelisPopulares() {
    this.servPelis.getPopulares()
      .subscribe(
        res => this.pelisPopulares = res
      );
  }

  getPelisEstreno() {
    this.servPelis.getPelisCine()
      .subscribe(
        res => this.pelisEstrenos = res
      );
  }

}
