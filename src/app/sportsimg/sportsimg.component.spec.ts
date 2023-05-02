import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsimgComponent } from './sportsimg.component';

describe('SportsimgComponent', () => {
  let component: SportsimgComponent;
  let fixture: ComponentFixture<SportsimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
