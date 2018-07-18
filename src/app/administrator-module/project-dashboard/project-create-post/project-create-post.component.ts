import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../../models/project';
import {SubscriberService} from '../../../services/subscriber.service';
import {PostService} from '../../../services/post.service';
import {ParentComponent} from '../../../components/parent/parent.component';
import {Store} from '@ngrx/store';
import {Globals} from "../../../../globals";

@Component({
  selector: 'app-project-create-post',
  templateUrl: './project-create-post.component.html',
  styleUrls: ['./project-create-post.component.scss']
})
export class ProjectCreatePostComponent extends ParentComponent implements OnInit {

  posts: any;
  postContent: string;
  isEdit: boolean;
  subscribers: any;
  idPost: any;
  titlePost: any;
  titleButton: any;
  project: Project;

  constructor(
    private postService: PostService,
    private store: Store<any>,
    private globals: Globals
  ) {
    super();
  }

  ngOnInit() {
    this.posts = [];
    this.project = this.globals.getProject();
    this.getPosts();
    this.idPost = 0;
    this.titlePost = 'Create';
    this.titleButton = 'Send message to the community';
    this.isEdit = false;

  }

  createPost() {
    if (this.idPost != 0) {
      this.updatePost();
      return;
    }
    const postCreate = {project: { apiToken: this.project.apiToken}, content: this.postContent};
    this.postService.add(postCreate).subscribe(
      data => {
        this.posts.unshift(data);
      }, err => {
      }
    );
    this.postContent = '';
  }

  editPost(idPost, content) {
    this.postContent = content;
    this.titlePost = 'Edit';
    this.titleButton = 'Update';
    this.isEdit = true;
    this.idPost = idPost;
  }

  finishEdit() {
    this.titlePost = 'Create';
    this.titleButton = 'Send message to the community';
    this.isEdit = false;
    this.postContent = '';
    this.idPost = 0;
    this.getPosts();
  }

  removePost(id) {
    this.postService.remove(id).subscribe(
      data => {
        this.getPosts();
        this.finishEdit();
      }, err => {
        this.posts = null;
      }
    );

  }

  updatePost() {
    this.postService.edit(this.idPost, this.postContent).subscribe(
      data => {
        this.getPosts();
        this.finishEdit();
      }, err => {
        this.posts = null;
      }
    );
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
