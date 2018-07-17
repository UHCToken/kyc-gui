import { ImuConfigService } from './config.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Store } from '@ngrx/store';
@Injectable()
export class PostService {

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

  get(apiToken) {
    const url = this.config.getBakend('api/posts');
    const params = new HttpParams()
      .set('token', this.token)
      .set('apiToken', apiToken);
    return this.http.get(url, {params: params});
  }

  add(post) {
    const url = this.config.getBakend('api/posts' );
    const formData: FormData = new FormData();
    const params = new HttpParams()
      .set('token', this.token);
    formData.append('apiToken', post.project.apiToken);
    formData.append('content', post.content);
    return this.http.post(
      url,
      formData,
      {params: params});
  }

  edit(id, content) {
    const url = this.config.getBakend('api/posts/' + id );
    const formData: FormData = new FormData();
    const params = new HttpParams()
      .set('token', this.token)
      .set('content', content);
    formData.append('content', content);
    return this.http.put(url , formData, {
      params: params
    });
  }

  remove(id) {
    const url = this.config.getBakend('api/posts/' + id);
    const params = new HttpParams()
      .set('token', this.token);
    return this.http.delete(url, {
      params: params
    });
  }
}
