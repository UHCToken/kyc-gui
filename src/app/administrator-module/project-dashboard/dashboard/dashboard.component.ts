import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../../../components/parent/parent.component';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ParentComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {

  }

}
