import { Component, OnInit } from '@angular/core';
import {footerColorReducer} from '../../reducers/footer-color.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  color: any;
  subscribers: any = {};

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.color = this.store.select('footerColorReducer');
    this.subscribers.userReducer = this.color.subscribe(
      color => {
        this.color = color;
      }
    );
  }

}
