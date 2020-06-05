import { Pelicula } from './pelicula';
export interface Favorites {
    id?: string;
    peliculas: Pelicula[];
    usuario: string;
}
