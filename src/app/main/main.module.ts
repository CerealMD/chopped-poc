import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { SharedModule } from '../background-components/shared-module';
import { AnswerViewModule } from './answer-view/answer-view.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { FlavorParringComponent } from './flavor-parring/flavor-parring.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SocialMediaComponent } from './social-media/social-media.component';



@NgModule({
  declarations: [
    MainComponent,
    LoginPageComponent,
    FlavorParringComponent,
    HomeComponent,
    SocialMediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    LandingPageModule,
    SharedModule,
    AnswerViewModule
  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }
