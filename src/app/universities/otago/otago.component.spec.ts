import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtagoComponent } from './otago.component';

describe('OtagoComponent', () => {
  let component: OtagoComponent;
  let fixture: ComponentFixture<OtagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
