import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth0Service } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectloggedGuard implements CanLoad {

  constructor(
    private servAuth: Auth0Service,
    private router: Router
  ) {}

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    const user = await this.servAuth.isAuth();
    if (user) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
