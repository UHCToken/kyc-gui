import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../../../components/parent/parent.component';
import {SET_PROJECT} from '../../../reducers/project.reducer';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import Global = NodeJS.Global;
import {Globals} from "../../../../globals";
import {Project} from "../../../models/project";

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class ProjectMainComponent extends ParentComponent implements OnInit {


  apiToken: null;
  project: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private store: Store<any>,
    private router: Router,
    private globals: Globals
  ) {
    super();
  }

  ngOnInit(): void {
    this.project = this.globals.getProject();
  }

}
