import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerViewComponent } from './main/answer-view/answer-view.component';
import { FlavorParringComponent } from './main/flavor-parring/flavor-parring.component';
import { HomeComponent } from './main/home/home.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { LoginPageComponent } from './main/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: 'answer-view',
    component: AnswerViewComponent,
  },
  {
    path: 'login-page',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'flavor-parring',
    component: FlavorParringComponent,
  },
  { path: '', component: LoginPageComponent },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
