import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarewellimgComponent } from './farewellimg.component';

describe('FarewellimgComponent', () => {
  let component: FarewellimgComponent;
  let fixture: ComponentFixture<FarewellimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarewellimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarewellimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
