import { TestBed } from '@angular/core/testing';

import { FlashCardsService } from './flash-cards.service';

describe('FlashCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashCardsService = TestBed.get(FlashCardsService);
    expect(service).toBeTruthy();
  });
});
