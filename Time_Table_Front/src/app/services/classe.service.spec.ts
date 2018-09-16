import { TestBed, inject } from '@angular/core/testing';

import { ClasseService } from './classe.service';

describe('ClasseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClasseService]
    });
  });

  it('should be created', inject([ClasseService], (service: ClasseService) => {
    expect(service).toBeTruthy();
  }));
});
