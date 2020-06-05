import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';

import { Categoria } from '../../interfaces/categoria';
import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  peliculas: Pelicula[] = [];
  numPag = 1;
  carga = true;
  idGen = 0;
  genero: Categoria = {
    id: 0,
    name: 'Eliga un genero'
  };
  constructor(
    public servGen: CategoriesService,
    private activedR: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getGeneros();
  }

  getPelis(page: number = 1) {
    this.carga = true;
    this.servGen.peliculasWGenr(this.genero.id, page).subscribe(res => {
      if (page === 1) {
        this.peliculas = res.results;
      } else {
        this.peliculas = this.peliculas.concat(res.results);
      }
      this.carga = false;
    });
  }
  procesaPropagar(page: number) {
    this.getPelis(page);
  }

  getGeneros() {
    this.servGen.getCategorias().subscribe(res => {
      this.servGen.categorias = res.genres;
      this.activedR.params.subscribe(param => {
        if (param.id) {
          this.genero = this.servGen.categorias.find(e => e.id === Number(param.id));
          this.getPelis();
        }
      });
    });
  }

}
