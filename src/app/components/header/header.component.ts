import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { PageActionsService } from './../../services/page-actions.service';
import { Store } from '@ngrx/store';
import { Observable } from '../../../../node_modules/rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: Observable<User>;
  constructor(
  	private apiService: ApiService,
    private pageAction: PageActionsService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.currentUser = this.store.select('userReducer');
  }

}
