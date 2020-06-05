import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  forma: FormGroup;
  peliculas: Pelicula[] = [];
  texto = '';
  carga = true;
  numPag = 1;
  constructor(
    private servPelicula: MoviesService,
    private activedR: ActivatedRoute
  ) {
    this.forma = new FormGroup({
      buscar: new FormControl(null, Validators.required)
    });
    activedR.params.subscribe(param => {
      if (param.id) {
        this.texto = param.id;
        this.buscar(this.texto);
      }
    });
  }

  ngOnInit() { }

  buscar(buscar: string, page: number = 1) {
    this.texto = buscar;
    if (this.texto === '') {
      return;
    }
    this.carga = true;
    this.servPelicula
      .buscarPelicula(this.texto, page)
      .subscribe(res => {
        if (page === 1) {
          this.peliculas = res;
        } else {
          this.peliculas = this.peliculas.concat(res);
        }
        this.carga = false;
      });
  }

  procesaPropagar(page: number) {
    this.buscar(this.texto, page);
  }

}
