import { Component, OnInit, ElementRef } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { CLEAR_USER, SET_USER_STATUS } from '../../../reducers/user.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user';
import { Observable } from 'rxjs/Observable';
import {ProjectService} from '../../../services/project.service';
import {ApiService} from "../../../services/api.service";
import {Project} from "../../../models/project";
import {Globals} from "../../../../globals";
import {SET_SUBSCRIBER} from "../../../reducers/subscriber.reducer";
import {SubscriberService} from "../../../services/subscriber.service";

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']

})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    user: Observable<User>;
    subscribers: any = {};
    menuItems: any[];
    projects: any;
    subscriber: any;




  constructor(
      location: Location,
      private element: ElementRef,
      private projectService: ProjectService,
      private router: Router,
      private apiService: ApiService,
      private store: Store<any>,
      private activatedRoute: ActivatedRoute,
      private globals: Globals,
      private subscriberService: SubscriberService
    ) {
      this.location = location;
    }

    ngOnInit() {

      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.user = this.store.select('userReducer');
      this.menuItems = [];

      this.subscribers.userReducer = this.user.subscribe(
        user => {

          if (user && user.token && user.token !== '' && user.isLogged) {

            if (user.role == 3) {
              const project = this.globals.getProject();
              this.subscriberService.getFromUserAndProject().subscribe(
                data => {
                  this.subscriber = data;
                  this.subscriber.project = this.globals.getProject();
                  this.store.dispatch({type: SET_SUBSCRIBER, payload: this.subscriber});
                });
              this.menuItems.push({ path: 'subscriber_project/general', title: 'Status', icon: '', class: '' });
              this.menuItems.push({ path: 'subscriber_project/feed', title: 'Messages', icon: '', class: '' });
            } else if (user.role == 1 || user.role == 2) {
              const project = this.globals.getProject();
              this.menuItems.push({ path: 'project/subscribers', title: 'Subscribers', icon: '', class: '' });
              this.menuItems.push({ path: 'project/create-post', title: 'Messages', icon: '', class: '' });
              this.menuItems.push({ path: 'project/reports', title: 'Reports', icon: '', class: '' });
              this.menuItems.push({ path: '/formkyc' , title: 'Form KYC', icon: '', class: '' });
            }
          }else {
            this.router.navigateByUrl('signin');
          }
        }
      );
    }

    signout(e) {
      e.preventDefault();
      this.apiService.signout();
    }



}
