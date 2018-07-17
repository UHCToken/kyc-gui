import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SubscriberService} from '../../services/subscriber.service';
import {S3Service} from '../../services/s3.service';
import {ɵgetDOM} from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from "../../../globals";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {SET_USER} from "../../reducers/user.reducer";
import {User} from "../../models/user";
import {Store} from "@ngrx/store";
import {SET_VALIDATE_TOKEN} from "../../reducers/validate-token.reducer";

@Component({
  selector: 'app-confirm-subscribe',
  templateUrl: './confirm-subscribe.component.html',
  styleUrls: ['./confirm-subscribe.component.scss']
})
export class ConfirmSubscribeComponent implements OnInit {

  udid: any;
  subscriber: any;
  createCustomer: FormGroup;
  loadingStart: boolean;
  url: any;
  message: any;
  loading: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private s3Service: S3Service,
    private meta: Meta,
    private globals: Globals,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {

    this.createCustomer = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(4)]],
      confirm_password: [null, [Validators.required, Validators.minLength(4)]],
    });

    this.loadingStart = true;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.udid = params['udid'];
    });

    this.subscriberService.subscribe_status(this.udid).subscribe(
      data => {
        this.subscriber = data;
        if (this.subscriber) {
          this.subscriber.project = this.globals.getProject();
          this.url = this.globals.url + '/assets/img/logo.png';
          this.meta.updateTag({ name: 'description', content: this.subscriber.project.description });
        } else {
          this.router.navigateByUrl('signin');
        }
        this.loadingStart = false;
      }, err => {
        this.loadingStart = false;
        this.router.navigateByUrl('signin');
      }
    );
  }

  confirm_password(form: FormGroup) {
    this.loading = true;
    const customer = {
      password: form.value.password,
      confirm_password: form.value.confirm_password,
      apiToken: this.udid,
    };

    this.subscriberService.update_password(customer).subscribe(
      data => {
        if (data['error']) {
          this.loading = false;

          this.message = {
            type: 'danger',
            message: data['message']
          };
        }else {
          let user = Object.assign(new User(), data['user']);
          user.token = data['token'];
          user.role = user.role.id;
          user.isLogged = true;
          this.store.dispatch({type: SET_VALIDATE_TOKEN, payload: true});
          this.store.dispatch({type: SET_USER, payload: user});
          this.router.navigateByUrl('dashboard/subscriber_project/general');
        }
      }, err => {
        this.loading = false;

        this.message = {
          type: 'danger',
          message: err.error.message
        };
      }
    );
  }


  goToLink(link): void {
    const re = new RegExp('^(http|https)://', 'i');
    const prefix = re.test(link) ?  '' : '//';
    window.open(prefix + link, '_blank');
  }
}
