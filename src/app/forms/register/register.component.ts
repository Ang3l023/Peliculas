import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../interfaces/user';

import { Auth0Service } from '../../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario: UsuarioModel;
  disabled = false;

  constructor(
    private servAuth: Auth0Service
  ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.disabled = true;
    const resp = await this.servAuth.SignUp(this.usuario);
    if (!resp) {
      this.usuario.password = '';
      this.disabled = false;
    }
  }

}
