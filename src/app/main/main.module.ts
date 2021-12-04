import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { SharedModule } from '../background-components/shared-module';
import { AnswerViewModule } from './answer-view/answer-view.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
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
