import { TestBed } from '@angular/core/testing';

import { ClientStateService } from './client-state.service';

describe('ClientStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientStateService = TestBed.get(ClientStateService);
    service.isAnswerShowing$.subscribe(v => {
      const expected = 'hide';
      const actual = v;
      expect(actual).toEqual(expected);
    })
  });

});
