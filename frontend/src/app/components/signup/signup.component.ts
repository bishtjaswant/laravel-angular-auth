import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  public error = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.createRegisterAccountForm();
   }

  ngOnInit() {
  }

  createRegisterAccountForm() {
            this.registerForm = this.formBuilder.group({
              name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5)
              ])],

              email : ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                this.validEmailAddress
              ])],

              password : ['', Validators.compose([
                Validators.required,
                Validators.minLength(5)
              ])],

            });
  }





  disableFormGroup() {
    this.registerForm.controls['name'].disable();
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['password'].disable();
  }

  validEmailAddress(control) {
    // tslint:disable-next-line:max-line-length
    const validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (validEmail.test(control.value)) {
      return null;
    } else {
      return { 'invalid': true };
    }
  }



  onRegisterRequest() {
         const signUpData = {
           name: this.registerForm.get('name').value,
           email: this.registerForm.get('email').value,
           password: this.registerForm.get('password').value,
         };

         console.log(signUpData);

    return this.http.post('http://127.0.0.1:8000/api/signup', signUpData)
         .subscribe(
           data => console.log(data),
           error => this.errorHandler(error),
         );


  }


  errorHandler( error ) {
    this.error =  error.errors;

    }




}
