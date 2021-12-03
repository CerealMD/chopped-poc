import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerViewComponent } from './main/answer-view/answer-view.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path: 'answer-view',
    component: AnswerViewComponent
  },
  { path:'', component:LandingPageComponent},
  { path: '**', component:LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
