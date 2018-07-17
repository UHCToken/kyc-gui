import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../../../components/parent/parent.component';
import {SET_SUBSCRIBER} from '../../../reducers/subscriber.reducer';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SubscriberService} from '../../../services/subscriber.service';

@Component({
  selector: 'app-subscriber-main',
  templateUrl: './subscriber-main.component.html',
  styleUrls: ['./subscriber-main.component.scss']
})
export class SubscriberMainComponent extends ParentComponent implements OnInit {


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
