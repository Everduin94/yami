import { TestBed, async, inject } from '@angular/core/testing';

import { FlashCardsGuard } from './flash-cards.guard';

describe('FlashCardsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashCardsGuard]
    });
  });

  it('should ...', inject([FlashCardsGuard], (guard: FlashCardsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
