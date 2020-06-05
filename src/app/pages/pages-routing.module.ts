import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { PeliDetalleComponent } from './peli-detalle/peli-detalle.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            },
            {
                path: 'detalles/:id',
                component: PeliDetalleComponent
            },
            {
                path: 'categories/:id',
                component: CategoriesComponent
            },
            {
                path: 'search/:id',
                component: SearchComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'favoritos',
                component: FavoritesComponent
            },
            {
                path: 'profile',
                component: PerfilComponent
            },
            {
                path: '**',
                redirectTo: '/',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
