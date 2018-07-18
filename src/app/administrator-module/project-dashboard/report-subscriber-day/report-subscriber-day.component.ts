import { Component, OnInit } from '@angular/core';
import {Project} from '../../../models/project';
import {PostService} from '../../../services/post.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {SubscriberService} from '../../../services/subscriber.service';
import {ParentComponent} from '../../../components/parent/parent.component';
import {ArrayDaysDatePipe} from '../../../pipes/array-days-date.pipe';
import {Globals} from "../../../../globals";

@Component({
  selector: 'app-report-subscriber-day',
  templateUrl: './report-subscriber-day.component.html',
  styleUrls: ['./report-subscriber-day.component.assets/scss/styles.scss']
})
export class ReportSubscriberDayComponent extends ParentComponent implements OnInit {

  subscriberPerDay: any;
  response: any;


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
    this.project = this.globals.getProject();
    this.getData();
  }

  getData() {
    this.subscriberService.subscriberPerDay(10).subscribe(
      data => {
        this.response = data;

        const dataPerDay = [];
        dataPerDay.push(['Date', 'Subscriber per Day']);
        const arrayDays = this.arrayDaysDate.transform(10);

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
          options: {
            'title': 'Subscriber Per Day',
            backgroundColor: '#070a10',
            hAxis: {
              textStyle: {
                color: 'white'
              },
              titleTextStyle: {
                color: 'white'
              }
            },
            vAxis: {
              textStyle: {
                color: 'white'
              },
              titleTextStyle: {
                color: 'white'
              }
            },
            legend: {
              textStyle: {
                color: 'white'
              },
              position: 'top',
              alignment: 'center'
            }
          },
        };

      }, err => {
      }
    );

  }
}
