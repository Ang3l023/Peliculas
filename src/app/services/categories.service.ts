import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Categoria } from '../interfaces/categoria';

import { environment } from '../../environments/environment';

import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categorias: Categoria[] = [];

  apiKey = environment.apikey;
  urlMoviedb = environment.url;

  constructor(
    private http: HttpClient,
    private servAlert: SweetalertService
  ) { }

  public getCategorias() {
    const url = `${this.urlMoviedb}/genre/movie/list?api_key=${this.apiKey}&language=es`;
    return this.RetornarData(url);
  }

  private RetornarData(uri: string) {
    return this.http.get(uri).pipe(
      map(resp => {
        const data: any = resp;
        return data;
      }, (err: any) => this.servAlert.getAlert('error', 'Algo salio mal'))
    );
  }

  public peliculasWGenr(id: number, numPage: number) {
    // tslint:disable-next-line: max-line-length
    const url = `${this.urlMoviedb}/discover/movie?api_key=${this.apiKey}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=${numPage}&with_genres=${id}`;
    return this.RetornarData(url);
  }

}
