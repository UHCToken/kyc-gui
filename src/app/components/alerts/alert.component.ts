import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Alert } from '../../models/alert';
import {ParentComponent} from '../parent/parent.component';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent extends ParentComponent implements OnInit {

  subscribers: any = {};
  alert: Observable<Alert>;
  keepAfterNavigationChange = false;
  timer: any = null;

  constructor(private store: Store<any>, private router: Router) {
    super();
    this.alert = store.select('alert');
    // clear alert message on route change
    this.subscribers.route = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.clearAlert();
        }
      }
    });
  }

  ngOnInit() {
    this.subscribers.alert = this.alert.subscribe(
      value => {
        if (value.show) {
          window.scrollTo(0, 0);
          this.timer = setTimeout(() => this.clearAlert(), value.time);
        }
      }
    );
  }

  clearAlert() {
    this.store.dispatch(
      {
        type: 'SET_ALERT', payload: Object.assign(new Alert(), {type: '', text: '', show: false })
      }
    );
  }
}
