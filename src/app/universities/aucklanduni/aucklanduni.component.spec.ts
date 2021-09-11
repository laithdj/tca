import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucklanduniComponent } from './aucklanduni.component';

describe('AucklanduniComponent', () => {
  let component: AucklanduniComponent;
  let fixture: ComponentFixture<AucklanduniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucklanduniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucklanduniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
