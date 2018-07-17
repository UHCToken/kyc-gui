import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSubscriberDayComponent } from './report-subscriber-day.component';

describe('ReportSubscriberDayComponent', () => {
  let component: ReportSubscriberDayComponent;
  let fixture: ComponentFixture<ReportSubscriberDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSubscriberDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSubscriberDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
