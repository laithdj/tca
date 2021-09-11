import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutComponent } from './aut.component';

describe('AutComponent', () => {
  let component: AutComponent;
  let fixture: ComponentFixture<AutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
