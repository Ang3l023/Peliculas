import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Service } from '../../services/firebase.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public servLogIn: Auth0Service,
    private servFav: FavoritesService
  ) { }

  ngOnInit() {
  }

  buscar(texto: string) {
    this.router.navigate(['/home/search', texto]);
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  async logout() {
    this.servFav.reiniciarFavs();
    await this.servLogIn.LogOut();
  }

}
