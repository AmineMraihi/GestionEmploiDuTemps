import { TestBed, inject } from '@angular/core/testing';

import { SeanceService } from './seance.service';

describe('SeanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeanceService]
    });
  });

  it('should be created', inject([SeanceService], (service: SeanceService) => {
    expect(service).toBeTruthy();
  }));
});
