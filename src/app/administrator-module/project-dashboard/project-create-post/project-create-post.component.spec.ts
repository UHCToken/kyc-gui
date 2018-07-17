import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreatePostComponent } from './project-create-post.component';

describe('ProjectCreatePostComponent', () => {
  let component: ProjectCreatePostComponent;
  let fixture: ComponentFixture<ProjectCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
