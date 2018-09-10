import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetRequestComponent } from './components/password/reset-request/reset-request.component';
import { ResponseRequestComponent } from './components/password/response-request/response-request.component';
import { AppRoutingModule } from './app-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { JarwisService } from './services/jarwis.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignupComponent,
    ProfileComponent,
    ResetRequestComponent,
    ResponseRequestComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [JarwisService, AuthService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
