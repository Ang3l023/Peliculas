import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase';

import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user: firebase.User;

  constructor(
    private servAlert: SweetalertService
  ) { }

  async updateUser(user: firebase.User, datosActual: { displayName: string }): Promise<boolean> {
    this.servAlert.loadingAlert('info', 'Espere Por Favor');
    try {
      const resp = await user.updateProfile({
        displayName: datosActual.displayName
      });
      this.servAlert.cerrarAlert();
      this.servAlert.getAlert('success', 'Actualidado correctamente');
      return true;
    } catch (error) {
      this.servAlert.cerrarAlert();
      this.servAlert.getAlert('error', 'Algo salio mal');
      return false;
    }
  }

  async updatePass(user: firebase.User, password: string): Promise<boolean> {
    this.servAlert.loadingAlert('info', 'Espere Por Favor');
    try {
      const resp = await user.updatePassword(password);
      this.servAlert.cerrarAlert();
      this.servAlert.getAlert('success', 'Actualidado correctamente');
      return true;
    } catch (error) {
      this.servAlert.cerrarAlert();
      this.servAlert.getAlert('error', error.message);
      return false;
    }
  }

}
