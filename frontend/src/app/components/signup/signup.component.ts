import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../services/jarwis.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  public error = [];
  username;

  constructor(
    private formBuilder: FormBuilder,
    private jarwis: JarwisService,
    private router: Router,
    private token: TokenService
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

        //  console.log(signUpData);
      this.disableFormGroup();
    this.jarwis.signupService(signUpData)
         .subscribe(
           data => this.handleResponseData(data),
           error => this.errorHandler(error),
         );
  }


  handleResponseData(data) {
    this.token.hadleTokenAccess(data.access_token); // token verified
    this.getUserDetail(data.user); // got user name
    this.router.navigateByUrl('/profile');
}

  getUserDetail(username) {
    this.username = username;
  }



  errorHandler( error ) {
    this.error =  error.errors;

    }




}
