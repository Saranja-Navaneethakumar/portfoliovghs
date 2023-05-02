import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraleventimgComponent } from './generaleventimg.component';

describe('GeneraleventimgComponent', () => {
  let component: GeneraleventimgComponent;
  let fixture: ComponentFixture<GeneraleventimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneraleventimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraleventimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
