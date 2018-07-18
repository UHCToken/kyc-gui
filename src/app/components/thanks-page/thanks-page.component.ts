import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Project} from "../../models/project";
import {Globals} from "../../../globals";

@Component({
  selector: 'app-thanks-page',
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.scss']
})
export class ThanksPageComponent implements OnInit {


  project: Project;

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
    this.project = this.globals.getProject();
  }


}
