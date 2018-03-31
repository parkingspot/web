import { TestBed, inject } from '@angular/core/testing';

import { ParkingsService } from './parkings.service';

describe('ParkingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkingsService]
    });
  });

  it('should be created', inject([ParkingsService], (service: ParkingsService) => {
    expect(service).toBeTruthy();
  }));
});
