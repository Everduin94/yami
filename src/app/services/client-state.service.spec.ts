import { TestBed } from '@angular/core/testing';

import { ClientStateService } from './client-state.service';

describe('ClientStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientStateService = TestBed.get(ClientStateService);
    expect(service).toBeTruthy();
  });
});
