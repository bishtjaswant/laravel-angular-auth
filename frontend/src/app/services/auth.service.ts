import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  authStatusChange(value: boolean) {
       this.loggedIn.next(value);
  }

  logout() {
     this.token.remove();
     this.router.navigateByUrl('/login');

  }
  constructor(
    private token: TokenService,
    private router: Router
    ) { }







}
