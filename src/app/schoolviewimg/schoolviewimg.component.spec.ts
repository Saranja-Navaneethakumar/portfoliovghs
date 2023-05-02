import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolviewimgComponent } from './schoolviewimg.component';

describe('SchoolviewimgComponent', () => {
  let component: SchoolviewimgComponent;
  let fixture: ComponentFixture<SchoolviewimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolviewimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolviewimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
