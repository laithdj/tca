import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoringComponent } from './tutoring.component';

describe('TutoringComponent', () => {
  let component: TutoringComponent;
  let fixture: ComponentFixture<TutoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
