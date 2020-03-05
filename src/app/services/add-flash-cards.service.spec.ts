import { TestBed } from '@angular/core/testing';

import { AddFlashCardsService } from './add-flash-cards.service';

describe('AddFlashCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddFlashCardsService = TestBed.get(AddFlashCardsService);
    expect(service).toBeTruthy();
  });
});
