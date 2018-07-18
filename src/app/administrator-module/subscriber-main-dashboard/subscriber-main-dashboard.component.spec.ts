import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberMainDashboardComponent } from './subscriber-main-dashboard.component';

describe('SubscriberMainDashboardComponent', () => {
  let component: SubscriberMainDashboardComponent;
  let fixture: ComponentFixture<SubscriberMainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberMainDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
