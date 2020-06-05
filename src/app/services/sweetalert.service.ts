import { Injectable } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  getAlert(icon: SweetAlertIcon = 'info', message: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon,
      text: message
    });
  }

  loadingAlert(icon: SweetAlertIcon = 'info', message: string) {
    Swal.fire({
      allowOutsideClick: false,
      icon,
      text: message
    });
    Swal.showLoading();
  }

  cerrarAlert() {
    Swal.close();
  }

}
