import { Component, OnInit } from '@angular/core';

import { Auth0Service } from '../services/firebase.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private servLogIn: Auth0Service,
    private servFav: FavoritesService
  ) {
    servFav.getFavs().subscribe();
  }

  ngOnInit() {
  }

}
