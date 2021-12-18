import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AnswerViewComponent } from './main/answer-view/answer-view.component';
import { FlavorParringComponent } from './main/flavor-parring/flavor-parring.component';
import { HomeComponent } from './main/home/home.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { LoginPageComponent } from './main/login-page/login-page.component';
import { ReplacementPageComponent } from './main/replacement-page/replacement-page.component';

const routes: Routes = [
  {
    path: 'landing-page',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'answer-view',
    component: AnswerViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'flavor-parring',
    component: FlavorParringComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'replace-item',
    component: ReplacementPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: LoginPageComponent },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
