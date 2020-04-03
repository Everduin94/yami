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

  /**
   * Before we had an array of values all in order.
   * 
   * Now a position in the array can be updated at any time
   * 
   * Use an object to track an items value
   */
  it('should return X given Y', () => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    const actual = service.answers$.subscribe(v => {
      const expected = 'X';
      const given = 'Y';
      expect(actual).toEqual(expected);
    });

    service.updateAnswers({my: 'value'});

  });

});
