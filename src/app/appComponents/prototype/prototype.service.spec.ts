import { TestBed } from '@angular/core/testing';

import { PrototypeService } from './prototype.service';

describe('PrototypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrototypeService = TestBed.get(PrototypeService);
    expect(service).toBeTruthy();
  });
});
