import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MottovisionmissionComponent } from './mottovisionmission.component';

describe('MottovisionmissionComponent', () => {
  let component: MottovisionmissionComponent;
  let fixture: ComponentFixture<MottovisionmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MottovisionmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MottovisionmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
