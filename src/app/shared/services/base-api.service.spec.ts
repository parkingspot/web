import { TestBed, inject } from '@angular/core/testing';

import { BaseApi.ServiceService } from './base-api.service.service';

describe('BaseApi.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseApi.ServiceService]
    });
  });

  it('should be created', inject([BaseApi.ServiceService], (service: BaseApi.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
