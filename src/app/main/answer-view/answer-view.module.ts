import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerViewComponent } from './answer-view.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'answer-view',
    component: AnswerViewComponent
  }
]

@NgModule({
  declarations: [
    AnswerViewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AnswerViewModule { }
