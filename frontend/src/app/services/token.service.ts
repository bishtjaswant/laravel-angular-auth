import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://127.0.0.1:8000/api/login',
    signup: 'http://127.0.0.1:8000/api/signup'
  };
  constructor() { }

  hadleTokenAccess(token) {
     this.set(token);
    //  console.log(this.isValidToken());

  }




  set(token) {
    localStorage.setItem('loginToken', token);
  }

  get() {
    return localStorage.getItem('loginToken');
  }

  remove() {
    localStorage.removeItem('loginToken');
  }

  isValidToken() {
    const token = this.get();
     if (token) {
          const payload = this.payload(token);
       // tslint:disable-next-line:no-unused-expression
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
     }
     return false;
  }

  payload(token) {
    const payload =  token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
         return JSON.parse(window.atob(payload));
  }


loggedIn() {
  return this.isValidToken();
}


}
