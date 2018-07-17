import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportContributionDayComponent } from './report-contribution-day.component';

describe('ReportContributionDayComponent', () => {
  let component: ReportContributionDayComponent;
  let fixture: ComponentFixture<ReportContributionDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportContributionDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportContributionDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
