import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SET_SUBSCRIBER} from '../../reducers/subscriber.reducer';
import {SubscriberService} from '../../services/subscriber.service';
import {Store} from '@ngrx/store';
import {ParentComponent} from '../../components/parent/parent.component';

@Component({
  selector: 'app-subscriber-main-dashboard',
  templateUrl: './subscriber-main-dashboard.component.html',
  styleUrls: ['./subscriber-main-dashboard.component.scss']
})
export class SubscriberMainDashboardComponent extends ParentComponent implements OnInit {

  apiToken: null;
  subscriber: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private store: Store<any>,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {



    this.activatedRoute.params.subscribe((params: Params) => {
      this.apiToken = params['udid'];
      if (this.apiToken) {
        this.subscriberService.get(this.apiToken).subscribe(
          data => {
            this.subscriber = data;
            this.store.dispatch({type: SET_SUBSCRIBER, payload: this.subscriber});
          }, err => {
          });
      }
    });


  }

}
