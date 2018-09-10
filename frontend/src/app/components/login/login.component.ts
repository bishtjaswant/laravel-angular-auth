import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator , FormControl, Validators } from '@angular/forms';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  createLoginForm() {
         this.loginForm = this.formBuilder.group({
           email: ['', Validators.compose([
              Validators.required,
             this.validEmailAddress,
           ])],
           password : ['', Validators.required],
         });
  }

  onLoginRequest() {
    const credentials = {
      email: this.loginForm.get('email').value,
      password : this.loginForm.get('password').value,
    };

    console.log(credentials);

    this.jarwis.loginService(credentials)
          .subscribe(
            data => this.handleResponseData(data),
            error => this.handleError(error),
          );


  }


  handleResponseData(data) {
     this.token.hadleTokenAccess(data.access_token); // token verified
    this.auth.authStatusChange(true);
     this.router.navigateByUrl('/profile');

  }


  handleError(error) {
    this.error = error.error.error;
  }

  disableFormGroup() {
    this.loginForm.controls['email'].disable();
    this.loginForm.controls['password'].disable();
  }

  validEmailAddress(control) {
    // tslint:disable-next-line:max-line-length
    const validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                 if (validEmail.test(control.value)) {
                      return null;
                 } else {
                    return { 'invalid': true};
                 }
  }



}
