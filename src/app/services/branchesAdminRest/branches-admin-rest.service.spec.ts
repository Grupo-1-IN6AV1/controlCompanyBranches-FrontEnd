import { TestBed } from '@angular/core/testing';

import { BranchesAdminRestService } from './branches-admin-rest.service';

describe('BranchesAdminRestService', () => {
  let service: BranchesAdminRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesAdminRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
