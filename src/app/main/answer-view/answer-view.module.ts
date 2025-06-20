import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerViewComponent } from './answer-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/background-components/shared-module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    AnswerViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule
  ]
})
export class AnswerViewModule { }
