import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurprincipalComponent } from './ourprincipal.component';

describe('OurprincipalComponent', () => {
  let component: OurprincipalComponent;
  let fixture: ComponentFixture<OurprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
