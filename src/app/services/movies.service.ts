import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Pelicula } from '../interfaces/pelicula';

import { environment } from '../../environments/environment';

import { Auth0Service } from './firebase.service';
import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  peliculas: Pelicula[] = [];

  apiKey = environment.apikey;
  urlMoviedb = environment.url;

  constructor(
    private http: HttpClient,
    private servAuth: Auth0Service,
    private servAlert: SweetalertService
  ) {}

  getPopulares() {
    const url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}&language=es`;
    return this.RetornarData(url);
  }

  getPopularesNinos() {
    // tslint:disable-next-line: max-line-length
    const url = `${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apiKey}&language=es`;
    return this.RetornarData(url);
  }

  getPopularesR() {
    // tslint:disable-next-line: max-line-length
    const url = `${this.urlMoviedb}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=${this.apiKey}&language=es`;
    return this.RetornarData(url);
  }

  buscarPelicula(texto: string, numPag: number) {
    const url = `${this.urlMoviedb}/search/movie?sort_by=popularity.desc&query=${texto}&api_key=${this.apiKey}&page=${numPag}&language=es`;
    return this.RetornarData(url);
  }

  getPelicula(id: number) {
    const url = `${this.urlMoviedb}/movie/${id}?api_key=${this.apiKey}&include_video=true&append_to_response=videos&language=es`;
    return this.http.get<Pelicula>(url)
            .pipe(
              map(
                res => res,
                (err: any) => this.servAlert.getAlert('error', 'Algo salio mal')
              )
            );
  }

  getPelisCine(numPag: number = 1) {
    const url = `${this.urlMoviedb}/movie/now_playing?api_key=${this.apiKey}&language=es&page=${numPag}`;
    return this.RetornarData(url);
  }

  getRecomendaciones(id: number, numPag: number = 1) {
    const url = `${this.urlMoviedb}/movie/${id}/recommendations?api_key=${this.apiKey}&language=es&page=${numPag}`;
    return this.RetornarData(url);
  }

  getMejorCalf(numPag: number) {
    const url = `${this.urlMoviedb}/movie/top_rated?api_key=${this.apiKey}&language=es&page=${numPag}`;
    return this.RetornarData(url);
  }

  // convertir datos

  RetornarData(uri: string) {
    return this.http.get(uri).pipe(
      map(resp => {
        const data: any = resp;
        return data.results;
      }, (err: any) => this.servAlert.getAlert('error', 'Algo salio mal') )
    );
  }

  getMoviesRelated(idmovie: number, numPag: number = 1) {
    const url = `${this.urlMoviedb}/movie/${idmovie}/similar?api_key=${this.apiKey}&language=es&page=${numPag}`;
    return this.RetornarData(url);
  }

  // datos extra

  getVideo(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&append_to_response=videos&language=es`;
    return this.http.get(url)
              .pipe(
                map(
                  res => res,
                  (err: any) => this.servAlert.getAlert('error', 'Algo salio mal')
                )
              );
  }

  Agregar(valor: number) {
    if (valor < 10) {
      return '0' + valor;
    }
    return valor;
  }

  Asignar(data: Pelicula[]) {
    this.peliculas = data;
  }

  Fecha() {
    const fecha = new Date();
    const hoy = `${fecha.getFullYear()}-${this.Agregar(
      fecha.getMonth()
    )}-${this.Agregar(fecha.getDate())}`;
    fecha.setDate(fecha.getDate() - 15);
    const mesAnterior = `${fecha.getFullYear()}-${this.Agregar(
      fecha.getMonth()
    )}-${this.Agregar(fecha.getDate())}`;
    return {
      hoy,
      mesAnterior
    };
  }

}
