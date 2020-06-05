import { Injectable } from '@angular/core';

import { Favorites } from '../interfaces/favorites';

import { Auth0Service } from './firebase.service';

import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

import { Pelicula } from '../interfaces/pelicula';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {


  favoritos: Favorites = {
    id: null,
    usuario: this.servAuth.user.uid,
    peliculas: []
  };

  constructor(
    private servAuth: Auth0Service,
    private firestore: AngularFirestore
  ) {
  }

  // Crea un nuevo favorito
  public createFav(favorito: Favorites) {
    delete favorito.id;
    return this.firestore.collection('favoritos').add(favorito);
  }
  // Obtiene un favorito
  public getFav(id: string) {
    return this.firestore.collection('favoritos').doc(id).get();
  }
  // Obtiene todos los favoritos
  public getFavs() {
    return this.firestore.collection('favoritos').get()
      .pipe(
        map(
          (res: any) => {
            res.docs.forEach((doc: any) => {
              if (this.servAuth.user.uid === doc.data().usuario) {
                this.favoritos.id = doc.id;
                this.favoritos.usuario = doc.data().usuario;
                this.favoritos.peliculas = doc.data().peliculas;
              }
            });
            return res;
          }
        )
      );
  }
  // Actualiza un Favorito
  public updateFav(id: string, favorito: Favorites) {
    return this.firestore.collection('favoritos').doc(id).set(favorito);
  }

  saveFav(pelicula: Pelicula): Promise<any> {
    this.favoritos.peliculas = this.favoritos.peliculas.concat(pelicula);
    if ( !this.favoritos.id ) {
      return this.createFav(this.favoritos);
    } else {
      return this.updateFav(this.favoritos.id, this.favoritos);
    }
  }

  deleteFav(pelicula: Pelicula): Promise<any> {
    const i = this.favoritos.peliculas.indexOf(pelicula);
    if (this.favoritos.peliculas.length === 1) {
      this.favoritos.peliculas = [];
    } else {
      this.favoritos.peliculas.splice(i, 1);
    }
    return this.updateFav(this.favoritos.id, this.favoritos);
  }

  verificarFav(pelicula: Pelicula) {
    try {
      const peliFav = this.favoritos.peliculas.find(peli => peli.id === pelicula.id);
      return peliFav;
    } catch (error) {
      return null;
    }
  }

  reiniciarFavs() {
    this.favoritos.id = null;
    this.favoritos.usuario = null;
    this.favoritos.peliculas = [];
  }

}
