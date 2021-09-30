import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationComponent } from './student-application.component';

describe('StudentApplicationComponent', () => {
  let component: StudentApplicationComponent;
  let fixture: ComponentFixture<StudentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
