import { UserService } from './../user.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {

appUser: AppUser;

  constructor(private auth: AuthService, private userService: UserService) { 
    this.auth.AppUser$.subscribe(appuser => this.appUser = appuser);
  }

  Logout()
  {
    this.auth.Logout();
  }

}
