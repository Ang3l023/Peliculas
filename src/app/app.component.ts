import { Component } from '@angular/core';

import { Auth0Service } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppPeliculas';

  constructor(private servAuth: Auth0Service) {}

}
