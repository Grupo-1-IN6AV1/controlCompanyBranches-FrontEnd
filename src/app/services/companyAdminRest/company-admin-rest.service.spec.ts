import { TestBed } from '@angular/core/testing';

import { CompanyAdminRestService } from './company-admin-rest.service';

describe('CompanyAdminRestService', () => {
  let service: CompanyAdminRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAdminRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
