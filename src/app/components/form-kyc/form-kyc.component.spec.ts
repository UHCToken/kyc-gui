import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKycComponent } from './form-kyc.component';

describe('FormKycComponent', () => {
  let component: FormKycComponent;
  let fixture: ComponentFixture<FormKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
