import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IctunionComponent } from './ictunion.component';

describe('IctunionComponent', () => {
  let component: IctunionComponent;
  let fixture: ComponentFixture<IctunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IctunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IctunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
