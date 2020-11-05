import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service'

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent implements OnInit {

  userName: String = "";
  showLogout: boolean = false;
  loggedOut: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
   }

  ngOnInit(): void {
    this.userName = this.authService.returnUserName();
  }

  logout(){
    this.toggleLogOut();
  }

  toggleLogOut(){
    this.showLogout ? this.showLogout = false : this.showLogout = true;
  }

  logOutUser(){

    this.loggedOut = true;

    localStorage.removeItem('token');
    localStorage.removeItem('userName');

     // we should redirect to login
     this.router.navigate(['/']);

     this.showLogout = false;

  }

}
