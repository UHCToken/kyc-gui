import { ImuConfigService } from './config.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Store } from '@ngrx/store';

@Injectable()
export class ProjectService {

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

  edit(project) {
    const url = this.config.getBakend('api/projects/' + project.apiToken );
    const params = new HttpParams()
    .set('token', this.token)
    .set('name', project.name)
    .set('description', project.description)
    .set('apiToken', project.apiToken)
    .set('awsAccessKeyId', project.awsAccessKeyId)
    .set('fileURL', project.fileURL)
    .set('whitePaper', project.whitePaper)
    .set('website', project.website);
    return this.http.put(url, {}, {
      params: params
    });
  }

}


