import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http: HttpClient) { }




  /**login servic */
  loginService(credentials ) {
   return this.http.post('http://127.0.0.1:8000/api/login', credentials);
  }

  /** signup servic */
    signupService(signUpData) {
    return  this.http.post('http://127.0.0.1:8000/api/signup', signUpData);
    }

}
