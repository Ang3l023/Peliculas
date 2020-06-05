import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Auth0Service } from '../../services/firebase.service';

import { UsuarioModel } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  disabled = false;

  constructor(
    private servAuth: Auth0Service
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  async Login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disabled = true;
    delete this.usuario.nombre;
    const resp = await this.servAuth.LogIn(this.usuario);
    if (!resp) {
      this.usuario.password = '';
      this.disabled = false;
    }
  }

  async logInGoogle() {
    await this.servAuth.loginWithGoogle();
  }

}
