import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestComponent } from './components/password/reset-request/reset-request.component';
import { ResponseRequestComponent } from './components/password/response-request/response-request.component';

const myRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reset-password', component: ResetRequestComponent },
  { path: 'response-reset-password', component: ResponseRequestComponent },
  { path: '', component: SignupComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(myRoutes),
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
