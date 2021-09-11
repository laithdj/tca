import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanterburyComponent } from './canterbury.component';

describe('CanterburyComponent', () => {
  let component: CanterburyComponent;
  let fixture: ComponentFixture<CanterburyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanterburyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanterburyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
