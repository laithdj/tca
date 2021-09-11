import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndergraduatesComponent } from './undergraduates.component';

describe('UndergraduatesComponent', () => {
  let component: UndergraduatesComponent;
  let fixture: ComponentFixture<UndergraduatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndergraduatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndergraduatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
