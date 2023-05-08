import { TestBed } from '@angular/core/testing';

import { HandledataService } from './handledata.service';

describe('HandledataService', () => {
  let service: HandledataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandledataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
