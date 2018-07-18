import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
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
import {Globals} from '../../../../globals';
import {IS_LOADING} from '../../../reducers/loading.reducer';
import {Subscriber} from '../../../models/subscriber';


@Component({
  selector: 'app-project-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent extends ParentComponent implements OnInit, OnDestroy {

  project: Project;
  response: any;
  subscribers: any;
  currentPage: number = 1;
  totalEntries: number;
  perPage: number = 10;
  loading: boolean;
  observableSubscriber: Observable<Subscriber>;
  subscriberDetails: Subscriber;
  @ViewChild('closeModalDetails') closeModalDetails: ElementRef = null;

  constructor(
    private store: Store<any>,
    private router: Router,
    private subscriberService: SubscriberService,
    private s3Service: S3Service,
    private globals: Globals
  ) {
    super();
  }

  ngOnInit(): void {
    this.project = this.globals.getProject();
    this.getSubscribers(1);
    this.store.dispatch({type: 'SET_GREY', payload: false});
  }


  getSubscribers(page: number) {
    this.store.dispatch({ type: IS_LOADING, payload: true });
    this.subscriberService.list(this.project, page, this.perPage).subscribe(
      data => {
        this.response = data;
        this.totalEntries = this.response.totalEntries;
        this.subscribers = this.response.data;
        this.currentPage = this.response.currentPage;
        this.perPage = this.response.perPage;
        this.loading = false;
        this.store.dispatch({ type: IS_LOADING, payload: false });
      }, err => {
        this.subscribers = null;
        this.store.dispatch({ type: IS_LOADING, payload: false });
      }
    );
  }

  exportSubscribers(): void {
    this.subscriberService.exportSubscribers(this.project);
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

  changeStatus(subscriber_id, status): void {
    this.subscriberService.update_status(subscriber_id, status).subscribe(
      data => {
        for (let i = 0; i < this.subscribers.length; i++) {
          if (this.subscribers[i].id === subscriber_id) {
            this.subscribers[i].status = status;
            break;
          }
        }
      }, err => {
      }
    );
  }

  detailsSuscriber(suscriberDetail) {
    this.subscriberDetails = suscriberDetail;
  }

  ngOnDestroy() {
    if (this.closeModalDetails != null) {
      this.closeModalDetails.nativeElement.click();
    }
  }
}
