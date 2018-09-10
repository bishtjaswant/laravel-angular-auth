import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator , FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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

    return this.http.post('http://127.0.0.1:8000/api/login', credentials)
          .subscribe(
            data => console.log(data),
            error => this.handleError(error),
          );


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
