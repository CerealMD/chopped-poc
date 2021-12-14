import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlavorParringComponent } from './flavor-parring.component';
import { SharedModule } from 'src/app/background-components/shared-module';

const routes: Routes = [
  {
    path: 'flavor-parring',
    component: FlavorParringComponent,
  },
];

@NgModule({
  declarations: [FlavorParringComponent],
  exports: [FlavorParringComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class FlavorParringModule {}
