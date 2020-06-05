import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { UsuarioModel } from '../interfaces/user';

import { environment } from '../../environments/environment';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  URI = environment.uriGoogle;

  user: firebase.User;

  constructor(
    private authFire: AngularFireAuth,
    private router: Router,
    private servAlert: SweetalertService
  ) {
    this.isAuth()
      .then(
        res => this.user = res
      )
      .catch(err => err);
  }

  async LogOut() {
    try {
      await this.authFire.signOut();
      this.user = null;
      this.router.navigate(['/login']);
    } catch (error) {
      this.servAlert.getAlert('error', 'Algo salio mal');
    }
  }

  async LogIn(usuario: UsuarioModel): Promise<boolean> {
    this.servAlert.loadingAlert('info', 'Espere Porfavor');
    try {
      const user = await this.authFire.signInWithEmailAndPassword(usuario.email, usuario.password);
      this.user = user.user;
      this.servAlert.cerrarAlert();
      this.router.navigate(['/home']);
      return true;
    } catch (error) {
      this.servAlert.cerrarAlert();
      this.servAlert.getAlert('error', error.code);
      return false;
    }
  }

  async SignUp(usuario: UsuarioModel) {
    try {
      const auth: firebase.auth.UserCredential = await this.authFire.createUserWithEmailAndPassword(usuario.email, usuario.password);

      this.servAlert.loadingAlert('info', 'Espere Porfavor');
      this.user = await this.authFire.currentUser;
      this.user.sendEmailVerification();
      this.user.updateProfile({
        displayName: usuario.nombre
      });
      this.servAlert.cerrarAlert();
      this.router.navigate(['/home']);
      return true;
    } catch (error) {
      this.servAlert.cerrarAlert();
      this.servAlert.getAlert('error', error.code);
      return false;
    }

  }

  isAuth(): Promise<firebase.User> {
    return new Promise( (resolve, reject) => {
      this.authFire.authState
        .subscribe(
          res => resolve(res),
          err => reject(null)
        );
    } );
  }

  async loginWithGoogle(): Promise<boolean> {
    try {
      const usuario = await this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      this.user = usuario.user;
      this.router.navigate(['/home']);
      return true;
    } catch (error) {
      this.servAlert.getAlert('error', error.code);
      return false;
    }
  }

}
