import { TestBed } from '@angular/core/testing';

import { TypeCompanyRestService } from './type-company-rest.service';

describe('TypeCompanyRestService', () => {
  let service: TypeCompanyRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCompanyRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
