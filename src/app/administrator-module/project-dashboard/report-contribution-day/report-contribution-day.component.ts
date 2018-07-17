import { Component, OnInit } from '@angular/core';
import {Project} from '../../../models/project';
import {PostService} from '../../../services/post.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {SubscriberService} from '../../../services/subscriber.service';
import {ParentComponent} from '../../../components/parent/parent.component';
import {Globals} from "../../../../globals";

@Component({
  selector: 'app-report-contribution-day',
  templateUrl: './report-contribution-day.component.html',
  styleUrls: ['./report-contribution-day.component.assets/scss/styles.scss']
})
export class ReportContributionDayComponent extends ParentComponent implements OnInit {

  contributionPerDay: any;
  response: any;


  subscribers: any;
  project: Project;

  constructor(
    private postService: PostService,
    private store: Store<any>,
    private subscriberService: SubscriberService,
    private globals: Globals
  ) {
    super();
  }

  ngOnInit() {
    this.project = this.globals.getProject();
    this.getData();
  }

  getData() {
    this.subscriberService.subscriberPerDay(10).subscribe(
      data => {
        this.response = data;

        const dataPerDayContribution = [];
        dataPerDayContribution.push(['Date', 'Contribution sum Day']);
        let sumContribution = 0;
        this.response.forEach(function(element) {
          sumContribution = sumContribution + element[2];
          dataPerDayContribution.push([element[0], sumContribution]);
        });

        this.contributionPerDay =  {
          chartType: 'AreaChart',
          dataTable: dataPerDayContribution,
          options: {
            'title': 'Contribution Per Day',
            backgroundColor: '#000',
          },
        };
      }, err => {
      }
    );

  }

}
