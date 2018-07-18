import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriberSettingsComponent} from './subscriber-detail-dashboard/subscriber-settings/subscriber-settings.component';
import {AuthGuard} from '../guard/auth.guard';
import {SubscriberMainDashboardComponent} from './subscriber-main-dashboard/subscriber-main-dashboard.component';
import {DashboardComponent} from './project-dashboard/dashboard/dashboard.component';
import {SubscriberFeedPostComponent} from './subscriber-feed-post/subscriber-feed-post.component';
import {SubscribersComponent} from './project-dashboard/subscribers/subscribers.component';
import {SubscriberMainComponent} from './subscriber-detail-dashboard/subscriber-main/subscriber-main.component';
import {StatusSubscribeComponent} from './subscriber-status/status-subscribe.component';
import {ProjectMainComponent} from './project-dashboard/project-main/project-main.component';
import {SubscriberIdentityComponent} from './subscriber-detail-dashboard/subscriber-identity/subscriber-identity.component';
import {ProjectCreatePostComponent} from './project-dashboard/project-create-post/project-create-post.component';
import {ProjectReportsComponent} from './project-dashboard/project-reports-main/project-reports.component';
import {ReportSubscriberDayComponent} from './project-dashboard/report-subscriber-day/report-subscriber-day.component';
import {ReportContributionDayComponent} from './project-dashboard/report-contribution-day/report-contribution-day.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'project', component: ProjectMainComponent,
        children: [
          { path: '', redirectTo: 'subscribers', pathMatch: 'full'  },
          { path: 'subscribers', component: SubscribersComponent },
          { path: 'create-post', component: ProjectCreatePostComponent },
          { path: 'reports', component: ProjectReportsComponent,
            children: [
              { path: 'subscriber-per-day', component: ReportSubscriberDayComponent },
              { path: 'contribution-per-day', component: ReportContributionDayComponent }
            ]
          },
        ]},
      { path: 'subscriber/:udid', component: SubscriberMainComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full'  },
          { path: 'general', component: SubscriberSettingsComponent },
          { path: 'identity', component: SubscriberIdentityComponent }
        ]},
      { path: 'subscriber_project', component: SubscriberMainDashboardComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full'  },
          { path: 'general', component: StatusSubscribeComponent },
          { path: 'feed', component: SubscriberFeedPostComponent },
        ]},
    ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorModuleRoutingModule { }
