import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpartnershipComponent } from './listpartnership.component';

describe('ListpartnershipComponent', () => {
  let component: ListpartnershipComponent;
  let fixture: ComponentFixture<ListpartnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpartnershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
