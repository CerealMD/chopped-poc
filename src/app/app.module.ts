import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './background-components/shared-module';
import { MainModule } from './main/main.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewAnswerPopUpComponent } from './background-components/components/add-new-answer-pop-up/add-new-answer-pop-up.component';
import { AddNewIngredientPopUpComponent } from './background-components/components/add-new-ingredient-pop-up/add-new-ingredient-pop-up.component';
import { ErrorPopUpComponent } from './background-components/components/error-pop-up/error-pop-up.component';
import { dbConnectionService } from './background-components/services/callDbConnection';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddNewAnswerPopUpComponent,
    AddNewIngredientPopUpComponent,
    ErrorPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
