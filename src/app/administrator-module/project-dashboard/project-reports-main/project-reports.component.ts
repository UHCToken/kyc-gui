import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {PostService} from '../../../services/post.service';
import {ParentComponent} from '../../../components/parent/parent.component';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../../models/project';
import {SubscriberService} from '../../../services/subscriber.service';
import {ArrayDaysDatePipe} from '../../../pipes/array-days-date.pipe';
import {Globals} from "../../../../globals";

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.scss']
})
export class ProjectReportsComponent extends ParentComponent implements OnInit {

  subscriberPerDay: any;
  contributionPerDay: any;
  response: any;
  optionsChart: any;
  numDays: number;


  subscribers: any;
  project: Project;

  constructor(
    private postService: PostService,
    private store: Store<any>,
    private subscriberService: SubscriberService,
    private arrayDaysDate: ArrayDaysDatePipe,
    private globals: Globals

  ) {
    super();
  }

  ngOnInit() {
    this.numDays = 7;
    this.project = this.globals.getProject();
    this.getData();

    this.optionsChart = {
      backgroundColor: '#fff',
      hAxis: {
        textStyle: {
          color: 'black'
        },
        titleTextStyle: {
          color: 'black'
        }
      },
      vAxis: {
        textStyle: {
          color: 'black'
        },
        titleTextStyle: {
          color: 'black'
        }
      },
      legend: 'none'
    };
  }

  changeNumDays() {
    this.getData();
  }

  getData() {
    this.subscriberService.subscriberPerDay(this.numDays).subscribe(
      data => {
        this.response = data;

        const dataPerDay = [];
        dataPerDay.push(['Date', 'Subscriber per Day']);
        const arrayDays = this.arrayDaysDate.transform(this.numDays);

        arrayDays.forEach((element, index) => {
          const dayFound = this.response.find(x => x[0] === element);
          if (dayFound === undefined || dayFound === null) {
            dataPerDay.push([element, 0]);
          } else {
            dataPerDay.push([element, dayFound[1]]);
          }
        });
        this.subscriberPerDay =  {
          chartType: 'ColumnChart',
          dataTable: dataPerDay,
          options: this.optionsChart,
        };

      }, err => {
      }
    );
    const numDayscontribution = Number(this.numDays) + Number(1);
    this.subscriberService.contributionPerDay(this.numDays).subscribe(
      data => {

        this.response = data['list'];

        const dataContriPerDay = [];
        dataContriPerDay.push(['Date', 'Contribution total subscribe per Day']);
        const arrayDays = this.arrayDaysDate.transform(this.numDays);

        let totalContribution = 0;

        if (data['sumTotal'][0] != null) {
          totalContribution = parseFloat(data['sumTotal'][0]);
        }

        arrayDays.forEach((element, index) => {
          const dayFound = this.response.find(x => x[0] === element);
          if (dayFound === undefined || dayFound === null) {
            dataContriPerDay.push([element, totalContribution]);
          } else {
            totalContribution = totalContribution + dayFound[2];
            dataContriPerDay.push([element, totalContribution]);
          }
        });
        this.contributionPerDay =  {
          chartType: 'AreaChart',
          dataTable: dataContriPerDay,
          options: this.optionsChart,
        };

      }, err => {
      }
    );

  }
}


