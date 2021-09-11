import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LincolnComponent } from './lincoln.component';

describe('LincolnComponent', () => {
  let component: LincolnComponent;
  let fixture: ComponentFixture<LincolnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LincolnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LincolnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
