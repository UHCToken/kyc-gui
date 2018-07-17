import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ApiService } from './services/api.service';
import { ImuConfigService } from './services/config.service';
import { InterceptedHttpService } from './services/intercepted-http.service';
import { UtilService } from './services/util.service';
import { PostService } from './services/post.service';
import { PageActionsService } from './services/page-actions.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { ParentComponent } from './components/parent/parent.component';
import { userReducer } from './reducers/user.reducer';
import {SubscriberService} from './services/subscriber.service';
import {ProjectService} from './services/project.service';
import { FormKycComponent } from './components/form-kyc/form-kyc.component';
import {FormatDatePipe} from './pipes/format-date.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {S3Service} from './services/s3.service';
import { DndModule } from 'ng2-dnd';
import {projectReducer} from './reducers/project.reducer';
import {subscriberReducer} from './reducers/subscriber.reducer';
import {Globals} from '../globals';
import {ConfirmSubscribeComponent} from './components/confirm-subscribe/confirm-subscribe.component';
import {LoadingComponent} from './components/utils/loading/loading.component';
import {ThanksPageComponent} from './components/thanks-page/thanks-page.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {validateTokenReducer} from './reducers/validate-token.reducer';
import { FooterComponent } from './components/footer/footer.component';
import {footerColorReducer} from './reducers/footer-color.reducer';
import { TermsComponent } from './components/terms/terms.component';
import { alert } from './reducers/alert';
import {isLoading} from './reducers/loading.reducer';

@NgModule({
  declarations: [
    FormKycComponent,
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    ConfirmSubscribeComponent,
    FormatDatePipe,
    CapitalizePipe,
    ParentComponent,
    LoadingComponent,
    ThanksPageComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    FooterComponent,
    ChangePasswordComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DndModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    StoreModule.forRoot({
      userReducer,
      alert,
      isLoading,
      validateTokenReducer,
      projectReducer,
      subscriberReducer,
      footerColorReducer
    })
  ],
  providers: [
    ApiService,
    SubscriberService,
    ProjectService,
    S3Service,
    FormatDatePipe,
    InterceptedHttpService,
    ImuConfigService,
    UtilService,
    AuthGuard,
    PostService,
    PageActionsService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
