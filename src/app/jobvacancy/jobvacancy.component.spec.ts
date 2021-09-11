import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobvacancyComponent } from './jobvacancy.component';

describe('JobvacancyComponent', () => {
  let component: JobvacancyComponent;
  let fixture: ComponentFixture<JobvacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobvacancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobvacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
