import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/background-components/shared-module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LoginPageModule { }
