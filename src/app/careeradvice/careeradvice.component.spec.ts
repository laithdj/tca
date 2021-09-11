import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareeradviceComponent } from './careeradvice.component';

describe('CareeradviceComponent', () => {
  let component: CareeradviceComponent;
  let fixture: ComponentFixture<CareeradviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareeradviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareeradviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
