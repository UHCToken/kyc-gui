import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { User } from '../../models/user';
import { SET_USER, CLEAR_USER } from '../../reducers/user.reducer';
import { Store } from '@ngrx/store';
import {Cookie} from "ng2-cookies/ng2-cookies";
import {SET_VALIDATE_TOKEN} from '../../reducers/validate-token.reducer';
import {SET_BLUE} from '../../reducers/footer-color.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loading: boolean;
  signinForm: FormGroup;
  message: any;
  email: string = null;
  keepMe: boolean = false;
  color: string = 'blue';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.loading = false;
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
    });
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
    this.apiService.signoutProccess();
    this.store.dispatch({type: 'SET_BLUE', payload: false});
  }

  signin(form: FormGroup) {
    if (!this.signinForm.valid) {
      return;
    }
    this.loading = true;
    const user = {
      email: form.value.email,
      password: form.value.password
    };

    this.apiService.signin(user).subscribe(
      data => {
        if (data['error']) {
          this.loading = false;

          // Remove User from store
          this.store.dispatch({ type: CLEAR_USER });

          this.message = {
            type: 'danger',
            message: 'Invalid credentials!'
          };
        }else {
        this.loading = false;

        const currentUser = new User();
        currentUser.email = user.email;
        currentUser.token = data['token'];
        currentUser.role = data['user'].role.id;
        currentUser.isLogged = true;
        // Save current user in store module
        this.store.dispatch({type: SET_USER, payload: currentUser});
        if (this.keepMe) {
          Cookie.set('KycTokenSession', currentUser.token, 1, '/');
        }
        if (currentUser.role == 1 || currentUser.role == 2) {
          this.router.navigateByUrl('dashboard/project/subscribers');
        }else if (currentUser.role == 3) {
          this.router.navigateByUrl('dashboard/subscriber_project/general');
        }
        this.message = {
          type: 'success',
          message: 'Logged in successfully! Redirecting...'
        };

      }
      }, err => {
        this.loading = false;

        // Remove User from store
        this.store.dispatch({type: CLEAR_USER});

        this.message = {
          type: 'danger',
          message: 'Invalid credentials!'
        };
      }
    );
  }
}
