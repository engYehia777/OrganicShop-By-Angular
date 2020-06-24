
import { ShoppingCartService } from './../shopping-cart.service';
import { UserService } from './../user.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppinCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

appUser: AppUser;
cart$: Observable<ShoppinCart>;

  constructor(private auth: AuthService, private userService: UserService, private shoppingCartService: ShoppingCartService) { 
    
  }

  async ngOnInit() {
    this.auth.AppUser$.subscribe(appuser => this.appUser = appuser);
    this.cart$= await this.shoppingCartService.getCart();
   
  }

  Logout()
  {
    this.auth.Logout();
  }

}
