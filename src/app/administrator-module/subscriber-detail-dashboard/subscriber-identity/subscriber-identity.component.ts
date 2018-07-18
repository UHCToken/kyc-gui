import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParentComponent } from '../../../components/parent/parent.component';
import {Project} from '../../../models/project';
import {SubscriberService} from '../../../services/subscriber.service';
import {S3Service} from '../../../services/s3.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {Subscriber} from '../../../models/subscriber';


@Component({
  selector: 'app-subscriber-identity',
  templateUrl: './subscriber-identity.component.html',
  styleUrls: ['./subscriber-identity.component.scss']
})
export class SubscriberIdentityComponent extends ParentComponent implements OnInit {

  observableSubscriber: Observable<Subscriber>;
  project: Project;
  response: any;
  im_responses: any;
  apiToken: any;
  loading: boolean;

  constructor(
    private store: Store<any>,
    private router: Router,
    private subscriberService: SubscriberService,
    private s3Service: S3Service
  ) {
    super();
  }

  ngOnInit(): void {

    this.observableSubscriber = this.store.select('subscriberReducer');
    this.subscribers.subscriberReducer = this.observableSubscriber.subscribe(
      subscriber => {
        if (subscriber) {
          this.subscriberService.get_im_responses(subscriber.apiToken).subscribe(
            data => {
              this.im_responses = this.response.data;

            }, err => {
              this.im_responses = null;
            }
          );        }
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
