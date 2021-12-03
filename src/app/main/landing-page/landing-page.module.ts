import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from 'src/app/background-components/shared-module';



@NgModule({
  declarations: [
    LandingPageComponent
  ],exports: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LandingPageModule { }
