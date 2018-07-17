import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParentComponent } from '../../../components/parent/parent.component';
import {Project} from '../../../models/project';
import {S3Service} from '../../../services/s3.service';
import {ProjectService} from '../../../services/project.service';
import {SET_PROJECT} from '../../../reducers/project.reducer';
import {Globals} from "../../../../globals";

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent extends ParentComponent implements OnInit {

  project: Project = new Project();
  loading: boolean;
  message: any;
  fileInput: any;


  constructor(
    private store: Store<any>,
    private router: Router,
    private s3Service: S3Service,
    private projectService: ProjectService,
    private globals: Globals
  ) {
    super();
  }

  ngOnInit(): void {
    this.loading = false;
    this.project = this.globals.getProject();
  }

  /*transferDataSuccess($event: any) {

    const dataTransfer: DataTransfer = $event.mouseEvent.dataTransfer;
    if (dataTransfer && dataTransfer.files) {
      const files: FileList = dataTransfer.files;
      const file: File = files[0];
      this.s3Service.upload(file, true).then((x) => {
        console.log(x);
        this.imagePath = x.url;
        this.project.awsAccessKeyId = x.awsAccessKeyId;
      });
    }
  }*/

  editProject() {
    this.loading = true;
    this.projectService.edit(this.project).subscribe(
      data => {
        if (data['error']) {
          this.loading = false;

          this.message = {
            type: 'danger',
            message: 'Please try again'
          };
        }else {
          this.loading = false;
          this.message = {
            type: 'success',
            message: 'Information has been saved succesfully.'
          };

        }
      }, err => {});
  }

  /*openFileUpload() {
    this.fileInput.click();
  }
  uploadImg(event) {
    const file = event.srcElement.files[0];

    this.s3Service.upload(file, true).then((x) => {
      console.log(x);
      this.imagePath = x.url;
      this.project.awsAccessKeyId = x.awsAccessKeyId;
    });
  }*/


}
