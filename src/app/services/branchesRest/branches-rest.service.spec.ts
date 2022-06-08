import { TestBed } from '@angular/core/testing';

import { BranchesRestService } from './branches-rest.service';

describe('BranchesRestService', () => {
  let service: BranchesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
