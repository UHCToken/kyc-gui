import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {PostService} from '../../services/post.service';
import {ParentComponent} from '../../components/parent/parent.component';
import {ɵgetDOM} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from '../../models/subscriber';
import {Store} from '@ngrx/store';
import {Globals} from "../../../globals";

@Component({
  selector: 'app-subscriber-feed-post',
  templateUrl: './subscriber-feed-post.component.html',
  styleUrls: ['./subscriber-feed-post.component.scss']
})
export class SubscriberFeedPostComponent extends ParentComponent implements OnInit {

  project: Project;
  posts: any;
  observableSubscriber: Observable<Subscriber>;


  constructor(
    private postService: PostService,
    private store: Store<any>,
    private globals: Globals
  ) {
    super();
  }

  ngOnInit() {
    this.project = this.globals.getProject();
    this.posts = [];
    this.getPosts();
  }


  getPosts() {
    this.postService.get(this.project.apiToken).subscribe(
      data => {
        this.posts = data;
      }, err => {
        this.posts = null;
      }
    );
  }

}
