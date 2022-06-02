import { TestBed } from '@angular/core/testing';

import { TownShipAdminRestService } from './town-ship-admin-rest.service';

describe('TownShipAdminRestService', () => {
  let service: TownShipAdminRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TownShipAdminRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
