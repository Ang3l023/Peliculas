import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './errors/error404/error404.component';

import { AuthGuard } from './guards/auth.guard';
import { RedirectloggedGuard } from './guards/redirectlogged.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule ),
    canLoad: [ AuthGuard ]
  },
  {
    path: '',
    loadChildren: () => import('./forms/forms.module').then(m => m.FormasModule),
    canLoad: [ RedirectloggedGuard ]
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
