import { TestBed } from '@angular/core/testing';

import { GrantService } from './grant-service.service';

describe('GrantService', () => {
  let service: GrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
