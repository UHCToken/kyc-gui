import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormKycComponent} from './components/form-kyc/form-kyc.component';
import {StatusSubscribeComponent} from './administrator-module/subscriber-status/status-subscribe.component';
import {SigninComponent} from './components/signin/signin.component';
import {ConfirmSubscribeComponent} from './components/confirm-subscribe/confirm-subscribe.component';
import {ThanksPageComponent} from './components/thanks-page/thanks-page.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {TermsComponent} from './components/terms/terms.component';

const routes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'formkyc',  component: FormKycComponent },
    { path: 'terms',  component: TermsComponent },
    { path: 'forgot-password',  component: ForgotPasswordComponent },
    { path: 'change-password/:udid',  component: ChangePasswordComponent },
    { path: 'confirm_subscribe/:udid',  component: ConfirmSubscribeComponent },
    { path: 'signin',  component: SigninComponent},
    { path: 'thanks-page',  component: ThanksPageComponent},
    { path: 'dashboard', loadChildren: 'app/administrator-module/administrator-module.module.ts#AdministratorModuleModule', }
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
