import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorModuleRoutingModule } from './administrator-module-routing.module';
import {ProjectSettingsComponent} from './project-dashboard/project-settings/project-settings.component';
import {SubscriberSettingsComponent} from './subscriber-detail-dashboard/subscriber-settings/subscriber-settings.component';
import {ProjectCreatePostComponent} from './project-dashboard/project-create-post/project-create-post.component';
import {DashboardComponent} from './project-dashboard/dashboard/dashboard.component';
import {StatusSubscribeComponent} from './subscriber-status/status-subscribe.component';
import {SubscriberIdentityComponent} from './subscriber-detail-dashboard/subscriber-identity/subscriber-identity.component';
import {SubscriberMainDashboardComponent} from './subscriber-main-dashboard/subscriber-main-dashboard.component';
import {SubscriberMainComponent} from './subscriber-detail-dashboard/subscriber-main/subscriber-main.component';
import {SubscriberFeedPostComponent} from './subscriber-feed-post/subscriber-feed-post.component';
import {ProjectMainComponent} from './project-dashboard/project-main/project-main.component';
import {SubscribersComponent} from './project-dashboard/subscribers/subscribers.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NavbarModule} from '../components/shared/navbar/navbar.module';
import {FormatDatePipe} from '../pipes/format-date.pipe';
import {AdminFormatDatePipe} from './pipes/format-date.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectReportsComponent} from './project-dashboard/project-reports-main/project-reports.component';
import {ReportSubscriberDayComponent} from './project-dashboard/report-subscriber-day/report-subscriber-day.component';
import {ReportContributionDayComponent} from './project-dashboard/report-contribution-day/report-contribution-day.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {ArrayDaysDatePipe} from '../pipes/array-days-date.pipe';
import {AlertComponent} from '../components/alerts/alert.component';
import {LoadingComponent} from '../components/loading/loading.component';

@NgModule({
  declarations: [
    StatusSubscribeComponent,
    DashboardComponent,
    SubscribersComponent,
    ProjectSettingsComponent,
    ProjectMainComponent,
    SubscriberMainComponent,
    SubscriberIdentityComponent,
    SubscriberSettingsComponent,
    ProjectCreatePostComponent,
    SubscriberFeedPostComponent,
    SubscriberMainDashboardComponent,
    AdminFormatDatePipe,
    ProjectReportsComponent,
    ReportSubscriberDayComponent,
    ReportContributionDayComponent,
    ArrayDaysDatePipe,
    AlertComponent,
    LoadingComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    NgxPaginationModule,
    Ng2GoogleChartsModule,
    CommonModule,
    AdministratorModuleRoutingModule
  ],
  providers: [
    FormatDatePipe,
    ArrayDaysDatePipe
  ]
})
export class AdministratorModuleModule { }
