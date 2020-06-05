import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidePeliculaComponent } from './slide-pelicula/slide-pelicula.component';
import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [SlidePeliculaComponent,
    ListaPeliculasComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    SlidePeliculaComponent,
    ListaPeliculasComponent
  ]
})
export class ComponentsModule { }
