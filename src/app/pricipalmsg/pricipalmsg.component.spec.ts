import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricipalmsgComponent } from './pricipalmsg.component';

describe('PricipalmsgComponent', () => {
  let component: PricipalmsgComponent;
  let fixture: ComponentFixture<PricipalmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricipalmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricipalmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
