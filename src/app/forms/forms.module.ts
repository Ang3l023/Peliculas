import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';

import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule
  ]
})
export class FormasModule { }
