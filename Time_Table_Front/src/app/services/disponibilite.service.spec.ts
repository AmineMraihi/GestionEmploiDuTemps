import { TestBed, inject } from '@angular/core/testing';

import { DisponibiliteService } from './disponibilite.service';

describe('DisponibiliteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisponibiliteService]
    });
  });

  it('should be created', inject([DisponibiliteService], (service: DisponibiliteService) => {
    expect(service).toBeTruthy();
  }));
});
