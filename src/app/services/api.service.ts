import { ImuConfigService } from './config.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Store } from '@ngrx/store';
import {CLEAR_USER} from '../reducers/user.reducer';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {SET_VALIDATE_TOKEN} from '../reducers/validate-token.reducer';

@Injectable()
export class ApiService {

  private token: any;
  user: Observable<User>;
  subscribers: any = {};

  constructor(
    private http: HttpClient,
    private config: ImuConfigService,
    private router: Router,
    private store: Store<any>
  ) {

    this.user = this.store.select('userReducer');
    this.subscribers.userReducer = this.user.subscribe(
      user => {
        if (user && user.token && user.token !== '') {
          this.token = user.token;
        }
      }
    );
   }

  signup(user: any) {
    const url = this.config.getBakend('user/signup');
    return this.http.post(url, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  activate(code: string) {
    const url = this.config.getBakend('user/verify/' + code);
    return this.http.get(url);
  }

  signin(user: any) {
    const url = this.config.getBakend('login');
    return this.http.post(
      url,
      {email: user.email, password: user.password},
      {});

  }

  signoutProccess() {
    Cookie.delete('KycTokenSession');
    this.store.dispatch({ type: CLEAR_USER });
    this.store.dispatch({type: SET_VALIDATE_TOKEN, payload: false});
  }

  signout() {
    const url = this.config.getBakend('api/logout');
    const params = new HttpParams()
      .set('token', this.token);
    this.signoutProccess();
    this.http.post(url, {}, {params: params}).subscribe();
    this.router.navigateByUrl('/signin');
  }

  validateToken(token: string) {
    const url = this.config.getBakend('api/sessions?token=' + token);
    const request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(null);
    return JSON.parse(request.responseText);
  }

  get(endpoint) {
    const url = this.config.getBakend(endpoint);
    const options = {
      reportProgress: true,
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token)
    };
    return this.http.get(url, options);
  }

  post(endpoint, data) {
    const url = this.config.getBakend(endpoint);

    const options = {
      reportProgress: true,
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token)
    };

    return this.http.post(url, data, options);
  }

  request(endpoint, data) {
    const url = this.config.getBakend(endpoint);
    const req = new HttpRequest('POST', url, data, {
      reportProgress: true,
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.token)
    });


    return this.http.request(req);
  }

  upload(endpoint, data) {
    const url = this.config.getBakend(endpoint);
    this.http.post(endpoint, data);
  }
}
