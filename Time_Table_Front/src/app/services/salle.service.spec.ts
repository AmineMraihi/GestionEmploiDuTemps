import { TestBed, inject } from '@angular/core/testing';

import { SalleService } from './salle.service';

describe('SalleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalleService]
    });
  });

  it('should be created', inject([SalleService], (service: SalleService) => {
    expect(service).toBeTruthy();
  }));
});
