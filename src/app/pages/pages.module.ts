import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { PeliDetalleComponent } from './peli-detalle/peli-detalle.component';
import { CategoriesComponent } from './categories/categories.component';
import { SearchComponent } from './search/search.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    InicioComponent,
    PagesComponent,
    PeliDetalleComponent,
    CategoriesComponent,
    SearchComponent,
    PerfilComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
