import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service'

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() showName : string;

  userName: String = "";

  showLogout: boolean = false;

  loggedOut: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
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
