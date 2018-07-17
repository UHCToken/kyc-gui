import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSubscribeComponent } from './status-subscribe.component';

describe('StatusSubscribeComponent', () => {
  let component: StatusSubscribeComponent;
  let fixture: ComponentFixture<StatusSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
