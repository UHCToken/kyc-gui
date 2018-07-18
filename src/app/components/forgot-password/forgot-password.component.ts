import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { User } from '../../models/user';
import { SET_USER, CLEAR_USER } from '../../reducers/user.reducer';
import { Store } from '@ngrx/store';
import {SubscriberService} from "../../services/subscriber.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading: boolean;
  signinForm: FormGroup;
  message: any;
  email: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private subscriberService: SubscriberService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.loading = false;
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
    this.store.dispatch({type: 'SET_BLUE', payload: false});
  }

  sendPasswordReset(form: FormGroup) {
    this.loading = true;
    const user = {
      email: form.value.email,
    };

    this.subscriberService.forgot_password(user.email).subscribe(
      data => {
      this.loading = false;
      this.message = {
        type: 'success',
        message: 'Please check your email for steps on how to reset your password!'
      };
    }, error => {
      this.loading = false;
      this.message = {
        type: 'danger',
        message: error.error.message
      };
    });
  }
}
