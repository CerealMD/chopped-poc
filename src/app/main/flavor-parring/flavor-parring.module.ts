import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlavorParringComponent } from './flavor-parring.component';
import { SharedModule } from 'src/app/background-components/shared-module';



@NgModule({
  declarations: [FlavorParringComponent],
  exports: [FlavorParringComponent],
  imports: [CommonModule, SharedModule],
})
export class FlavorParringModule {}
