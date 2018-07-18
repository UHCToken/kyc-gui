import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {

  currentUser: Observable<User>;
  validateToken: Observable<boolean>;
  tokenWasValidated: boolean;

  activated: boolean = false;

  constructor(
    private router: Router,
    private store: Store<any>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.validateToken = this.store.select('validateTokenReducer');
    this.validateToken.subscribe(
      data => {
        this.tokenWasValidated = data;
      }
    );
    this.currentUser = this.store.select('userReducer');
    this.currentUser.subscribe(
      user => {
        if (user && user.token && user.token !== '' && user.isLogged) {
          this.activated = true;
        } else {
          this.activated = false;
        }
      }
    );

    // not logged in so redirect to login page with the return url
    if (this.activated) {
      return true;
    }

    if (!this.tokenWasValidated) {
      return true;
    }


    this.router.navigate(['/signin']);
    return false;
  }
}
