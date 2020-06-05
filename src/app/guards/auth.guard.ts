import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Auth0Service } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private servAuth: Auth0Service,
    private router: Router
  ) {}

  async canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Promise<boolean> {
    const user = await this.servAuth.isAuth();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
