import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParentComponent } from '../../../components/parent/parent.component';
import {S3Service} from '../../../services/s3.service';
import {Subscriber} from '../../../models/subscriber';

@Component({
  selector: 'app-subscriber-settings',
  templateUrl: './subscriber-settings.component.html',
  styleUrls: ['./subscriber-settings.component.scss']
})
export class SubscriberSettingsComponent extends ParentComponent implements OnInit {

  observableSubscriber: Observable<Subscriber>;
  subscriber: Subscriber;
  loading: boolean;
  message: any;
  imagePath: string;
  fileInput: any;


  constructor(
    private store: Store<any>,
    private router: Router,
    private s3Service: S3Service

  ) {
    super();
  }

  ngOnInit(): void {
    this.loading = false;
    this.observableSubscriber = this.store.select('subscriberReducer');
    this.subscribers.subscriberReducer = this.observableSubscriber.subscribe(
      subscriber => {
        if (subscriber) {
          this.subscriber = subscriber;
        }
      }
    );
  }

  openSignedURL(awsAccessKeyId): void {
    this.s3Service.getSignedURL(awsAccessKeyId).subscribe(
      data => {
        const url = data['message'];
        window.open(url, '_blank');
      },
      err => {
      }
    );
  }


}
