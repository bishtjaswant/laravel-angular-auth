import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  loggedIn: boolean;
  constructor(private auth: AuthService,
             private router: Router,
             private token: TokenService) { }

  ngOnInit() {

    this.auth.authStatus.subscribe( data => this.loggedIn = data);
  }

  logout(event: MouseEvent) {
           event.preventDefault();
           this.auth.authStatusChange(false);
           this.token.remove();
           this.router.navigateByUrl('/login');
  }

}
