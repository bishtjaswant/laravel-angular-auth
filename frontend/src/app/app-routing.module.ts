import { NgModule } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestComponent } from './components/password/reset-request/reset-request.component';
import { ResponseRequestComponent } from './components/password/response-request/response-request.component';
import { LoginComponent } from './components/login/login.component';
import { BeforeLoginGuard } from './auth/before-login.guard';
import { AfterLoginGuard } from './auth/after-login.guard';

const myRoutes: Routes = [

  { path: 'signup', component: SignupComponent, canActivate: [BeforeLoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginGuard] },
  { path: 'reset-password', component: ResetRequestComponent, canActivate: [AfterLoginGuard] },
  { path: 'response-reset-password', component: ResponseRequestComponent, canDeactivate: [AfterLoginGuard] },
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
