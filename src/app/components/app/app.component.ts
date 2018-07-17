import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { Store } from '@ngrx/store';
import { SET_USER } from './../../reducers/user.reducer';
import { ParentComponent } from './../parent/parent.component';
import {ApiService} from '../../services/api.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {SET_VALIDATE_TOKEN} from '../../reducers/validate-token.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ParentComponent implements OnInit {

  guest: boolean;
  user: Observable<User>;
  session: any;

  constructor(
    private store: Store<any>,
    private apiService: ApiService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {

    this.user = this.store.select('userReducer');
    const token = Cookie.get('KycTokenSession');
    if (token && token !== '') {
      const data = this.apiService.validateToken(token);
      if (data.error) {
        this.apiService.signoutProccess();
        this.router.navigate(['/signin']);
      } else {
        this.session = data;
        let user = Object.assign(new User(), this.session.user);
        user.token = this.session.token;
        user.role = user.role.id;
        user.isLogged = true;
        this.store.dispatch({type: SET_VALIDATE_TOKEN, payload: true});
        this.store.dispatch({type: SET_USER, payload: user});
      }
    } else {
      this.store.dispatch({type: SET_VALIDATE_TOKEN, payload: true});
    }

    const route =  window.location.href.split('/');
  }
}
