import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.scss']
})
export class LoadingComponent {

  isLoading: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isLoading = this.store.select('isLoading');
  }
}
