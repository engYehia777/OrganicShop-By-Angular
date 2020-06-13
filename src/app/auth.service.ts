import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  Login() {
    //save returnUrl to redirect avter login 
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    //redirect to google API for sign in 
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  Logout() {
    this.afAuth.signOut();
    return this.user$;
  }

  get AppUser$(): Observable<AppUser> {

    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userService.get(user.uid).valueChanges();
      }
      else {
        return of(null);
      }
    }));
  }


  
}
