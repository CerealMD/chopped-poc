import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FlavorParringComponent } from './flavor-parring.component';

const routes: Routes = [
  {
    path: 'flavor-parring',
    component: FlavorParringComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FlavorParringModule { }
