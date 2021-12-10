import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/background-components/shared-module';

const routes: Routes = [
  {
    path: 'login-page',
    component: LoginPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class LoginPageModule { }
