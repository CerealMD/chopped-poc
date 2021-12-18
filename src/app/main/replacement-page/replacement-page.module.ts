import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/background-components/shared-module';
import { ReplacementPageComponent } from './replacement-page.component';



@NgModule({
  declarations: [ReplacementPageComponent],
  exports: [ReplacementPageComponent],
  imports: [CommonModule, SharedModule],
})
export class ReplacementPageModule { }
