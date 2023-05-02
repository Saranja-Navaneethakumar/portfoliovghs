import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheivementimgComponent } from './acheivementimg.component';

describe('AcheivementimgComponent', () => {
  let component: AcheivementimgComponent;
  let fixture: ComponentFixture<AcheivementimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcheivementimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheivementimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
