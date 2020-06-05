import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Auth0Service } from '../../services/firebase.service';
import { ProfileService } from '../../services/profile.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: firebase.User;

  fecha = new Date();

  texto = 'Editar Datos';

  forma: FormGroup;
  updPassForm: FormGroup;

  newuser: { displayName: string } = {
    displayName: ''
  };

  pwdNew = '';
  pwd2New = '';

  constructor(
    private servPerfil: Auth0Service,
    private servProfile: ProfileService,
    private servAlert: SweetalertService
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.servPerfil.user || null;
    this.forma = new FormGroup({
      displayName: new FormControl( this.usuario.displayName , Validators.required)
    });
    this.updPassForm = new FormGroup({
      password: new FormControl(this.pwdNew, [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(this.pwd2New, [Validators.required, Validators.minLength(8)])
    }, {
        validators: [this.sonIguales('password', 'password2')]
    } );
  }

  cambiarTexto() {
    if (this.texto === 'Actualizar Password') {
      this.texto = 'Editar Datos';
    } else {
      this.texto = 'Actualizar Password';
    }
  }

  async actualizarCambios() {
    if (this.forma.invalid) {
      return;
    }
    this.newuser = {
      displayName: this.forma.controls.displayName.value
    };
    const resp = await this.servProfile.updateUser(this.usuario, this.newuser);
    this.newuser = {
      displayName: this.usuario.displayName
    };
  }

  async actualizarPwd() {
    if (this.updPassForm.invalid) {
      if (this.updPassForm.errors?.sonIguales) {
        this.servAlert.getAlert('error', 'Las contraseñas no coinciden');
      } else if (this.updPassForm.controls.password.errors?.minlength) {
        this.servAlert.getAlert(
          'error',
          `Se requieren
          ${this.updPassForm.controls.password.errors?.minlength.requiredLength} cáracteres
          y solo se detectaron
          ${this.updPassForm.controls.password.errors?.minlength.actualLength} cárcteres`);
      }
      return;
    }
    this.pwdNew = this.updPassForm.controls.password.value;

    const resp = await this.servProfile.updatePass(this.usuario, this.pwdNew);
    this.pwdNew = '';
    this.pwd2New = '';

  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

}
