
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { ImuConfigService } from './config.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user';
import { Store } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as req from 'request';
import * as FileSaver from 'file-saver';
import {Globals} from '../../globals';

@Injectable()
export class S3Service {
  private http: HttpClient;
  private file_name: string;
  private token: any;
  user: Observable<User>;
  subscribers: any = {};

  constructor(
    private http_c: HttpClient,
    private globals: Globals,
    private store: Store<any>,
    private imuConfig: ImuConfigService
  ) {
    this.http = http_c;
    this.user = this.store.select('userReducer');
    this.subscribers.userReducer = this.user.subscribe(
      user => {
        if (user && user.token && user.token !== '') {
          this.token = user.token;
        }
      }
    );
  }

  putSignedURL(contentType: any) {
    const url = this.imuConfig.getBakend('s3/putSignedURL');
    const params = new HttpParams()
      .set('contentType', contentType);
    return this.http.get(url, {params: params});
  }

  getSignedURL(awsAccessKeyId: any) {
    const url = this.imuConfig.getBakend('api/s3/getSignedURL');
    const params = new HttpParams()
      .set('awsAccessKeyId', awsAccessKeyId)
      .set('token', this.token);
    return this.http.get(url, {params: params});
  }

  upload(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.putSignedURL(file.type).subscribe(
        data => {
          const url = data['message'];
          this.http.put(url, file).subscribe(
            data => {
            }, err => {
              const urlObject = new URL(url);
              const awsAccessKeyId = urlObject.pathname.substr(1);
              const response = new Object();
              response['awsAccessKeyId'] = awsAccessKeyId;
              resolve(response);
            }
          );
        },
        err => {
          console.error(err);
          reject();
        }
      );
    });

  }

  generateSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
    const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
    const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
    const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);

    return kSigning;
  }

  generateTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + month + day;
  }

}


