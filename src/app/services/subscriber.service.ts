import { ImuConfigService } from './config.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Store } from '@ngrx/store';
import {Globals} from '../../globals';

@Injectable()
export class SubscriberService {

  private token: any;
  user: Observable<User>;
  subscribers: any = {};

  constructor(
    private http: HttpClient,
    private config: ImuConfigService,
    private router: Router,
    private store: Store<any>,
    private globals: Globals
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

  subscriberPerDay(days) {
    const url = this.config.getBakend('api/subscribers/subscriberPerDay');
    const params = new HttpParams()
      .set('token', this.token)
      .set('days', days);
    return this.http.get(url, {params: params});
  }

  contributionPerDay(days) {
    const url = this.config.getBakend('api/subscribers/contributionPerDay');
    const params = new HttpParams()
      .set('token', this.token)
      .set('days', days);
    return this.http.get(url, {params: params});
  }

  list(project, currentPage, perPage) {
    const url = this.config.getBakend('api/subscribers');
    const params = new HttpParams()
      .set('token', this.token)
      .set('apiToken', project.apiToken)
      .set('currentPage', currentPage)
      .set('perPage', perPage);
    return this.http.get(url, {params: params});
  }

  get(apiToken) {
    const url = this.config.getBakend('api/subscribers/' + apiToken);
    const params = new HttpParams()
      .set('token', this.token);
    return this.http.get(url, {params: params});
  }


  getFromUserAndProject() {
    const url = this.config.getBakend('api/users/subscriber');
    const project = this.globals.getProject();
    const params = new HttpParams()
      .set('token', this.token)
      .set('apiToken', project.apiToken);
    return this.http.get(url, {params: params});
  }

  exportSubscribers(project) {
    const url = this.config.getBakend('api/subscribers/export?token=' + this.token + '&apiToken=' + project.apiToken);
    window.open(url, '_blank');
  }

  create(subscribe: any) {
    const url = this.config.getBakend('create_subscriber');

    const formData: FormData = new FormData();
    formData.append('firstName', subscribe.firstName);
    formData.append('lastName', subscribe.lastName);
    formData.append('email', subscribe.email);
    formData.append('birthdate', subscribe.birthdate);
    formData.append('typeAddress', subscribe.typeAddress);
    formData.append('publicAddress', subscribe.publicAddress);
    formData.append('contribution', subscribe.contribution);
    formData.append('apiToken', subscribe.apiToken);
    formData.append('billingAddress', subscribe.billingAddress);
    if (subscribe.awsAccessKeyId) {
      formData.append('awsAccessKeyId', subscribe.awsAccessKeyId);
      formData.append('extensionFile', subscribe.extensionFile);
      formData.append('documentType', subscribe.documentType);
    }
    if (subscribe.awsAccessKeyId2) {
      formData.append('awsAccessKeyId2', subscribe.awsAccessKeyId2);
      formData.append('extensionFile2', subscribe.extensionFile2);
    }
    formData.append('country', subscribe.country); // ISO 3166
    formData.append('state', subscribe.state);
    formData.append('fingerprint', subscribe.fingerprint);
    formData.append('referr', subscribe.referr);
    return this.http.post(url, formData, {
    });
  }

  update_password(subscribe: any) {
    const url = this.config.getBakend('update_password');

    const formData: FormData = new FormData();
    formData.append('password', subscribe.password);
    formData.append('validatePassword', subscribe.confirm_password);
    formData.append('apiToken', subscribe.apiToken);

    return this.http.post(url, formData, {
    });
  }

  reset_password(subscribe: any) {
    const url = this.config.getBakend('reset_password');

    const formData: FormData = new FormData();
    formData.append('password', subscribe.password);
    formData.append('validatePassword', subscribe.confirm_password);
    formData.append('tokenResetPassword', subscribe.tokenResetPassword);

    return this.http.post(url, formData, {
    });
  }

  forgot_password(email: string) {
    const url = this.config.getBakend('forgot_password');

    const formData: FormData = new FormData();
    formData.append('email', email);

    return this.http.post(url, formData, {
    });
  }

  validate_password_update(tokenResetPassword: string) {
    const url = this.config.getBakend('validate-password-update');

    const formData: FormData = new FormData();
    formData.append('tokenResetPassword', tokenResetPassword);

    return this.http.post(url, formData, {
    });
  }


  update_status(subscribe_id, new_status) {
    const url = this.config.getBakend('api/subscribers/update_status/' + subscribe_id);
    const params = new HttpParams()
      .set('token', this.token)
      .set('status', new_status);
    return this.http.post(url, {}, {params: params});
  }

  subscribe_status(token) {
    const url = this.config.getBakend('subscriber');
    const params = new HttpParams()
      .set('apiToken', token);
    return this.http.get(url, {params: params});
  }

  get_im_responses(apiToken) {
    const url = this.config.getBakend('api/im_responses');
    const params = new HttpParams()
      .set('token', this.token)
      .set('apiToken', apiToken);
    return this.http.get(url, {params: params});
  }

}


