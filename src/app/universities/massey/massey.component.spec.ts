import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasseyComponent } from './massey.component';

describe('MasseyComponent', () => {
  let component: MasseyComponent;
  let fixture: ComponentFixture<MasseyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasseyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasseyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
