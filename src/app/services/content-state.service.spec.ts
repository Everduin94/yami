import { TestBed } from '@angular/core/testing';

import { ContentStateService } from './content-state.service';

describe('ContentStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentStateService = TestBed.get(ContentStateService);
    expect(service).toBeTruthy();
  });
});
