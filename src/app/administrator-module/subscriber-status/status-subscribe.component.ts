import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriberService} from '../../services/subscriber.service';
import {S3Service} from '../../services/s3.service';
import { Meta } from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from '../../models/subscriber';
import {ParentComponent} from '../../components/parent/parent.component';
import {Store} from '@ngrx/store';
import {Globals} from '../../../globals';

@Component({
  selector: 'app-status-subscribe',
  templateUrl: './status-subscribe.component.html',
  styleUrls: ['./status-subscribe.component.scss']
})
export class StatusSubscribeComponent extends ParentComponent implements OnInit {

  udid: any;
  subscriber: any;
  loadingStart: boolean;
  url: any;
  observableSubscriber: Observable<Subscriber>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private s3Service: S3Service,
    private meta: Meta,
    private globals: Globals,
    private store: Store<any>
  ) {
    super();
  }

  ngOnInit() {
    this.loadingStart = true;

    this.observableSubscriber = this.store.select('subscriberReducer');
    this.subscribers.subscriberReducer = this.observableSubscriber.subscribe(
      subscriber => {
        if (subscriber) {
          this.subscriber = subscriber;
          if (this.subscriber.id === 0) {
            this.subscriber = null;
            return;
          }
          this.url = this.globals.url + '/assets/img/logo.png';
          this.subscriber.project = this.globals.getProject();
          this.meta.updateTag({ name: 'description', content: this.subscriber.project.description });
          this.loadingStart = false;
        }
      }
    );
    this.store.dispatch({type: 'SET_GREY', payload: false});


  }

  goToLink(link): void {
    const re = new RegExp('^(http|https)://', 'i');
    const prefix = re.test(link) ?  '' : '//';
    window.open(prefix + link, '_blank');
  }
}
