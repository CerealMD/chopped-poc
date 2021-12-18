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
import { AnswerPerOptionComponent } from './background-components/components/answer-per-option/answer-per-option.component';
import { ForcePassResetDialogComponent } from './background-components/components/force-pass-reset-dialog/force-pass-reset-dialog.component';
import { ShowPairingDialogComponent } from './background-components/components/show-pairing-dialog/show-pairing-dialog.component';
import { NewPairingDialogComponent } from './background-components/components/new-pairing-dialog/new-pairing-dialog.component';
import { ShowReplaceDialogComponent } from './background-components/components/show-replace-dialog/show-replace-dialog.component';
import { NewReplaceDialogComponent } from './background-components/components/new-replace-dialog/new-replace-dialog.component';
import { SignUpPopupComponent } from './background-components/components/sign-up-popup/sign-up-popup.component';
import { ConfSingUpPopupComponent } from './background-components/components/conf-sing-up-popup/conf-sing-up-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewAnswerPopUpComponent,
    AddNewIngredientPopUpComponent,
    ErrorPopUpComponent,
    AnswerPerOptionComponent,
    ForcePassResetDialogComponent,
    ShowPairingDialogComponent,
    NewPairingDialogComponent,
    ShowReplaceDialogComponent,
    NewReplaceDialogComponent,
    SignUpPopupComponent,
    ConfSingUpPopupComponent
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
