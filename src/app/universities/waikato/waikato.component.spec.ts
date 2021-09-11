import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaikatoComponent } from './waikato.component';

describe('WaikatoComponent', () => {
  let component: WaikatoComponent;
  let fixture: ComponentFixture<WaikatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaikatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaikatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
