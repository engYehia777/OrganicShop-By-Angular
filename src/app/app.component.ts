import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrganicShop';

  constructor(private UserService: UserService, private auth: AuthService, private router: Router){
    //redirect user after login to the previous url 
    auth.user$.subscribe(user => {
      if(user){
        // attention every time user loged in it goes to save or update his info 
        UserService.Save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
