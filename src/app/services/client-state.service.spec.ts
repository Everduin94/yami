import { TestBed } from '@angular/core/testing';

import { ClientStateService } from './client-state.service';
import { skip } from 'rxjs/operators';

describe('ClientStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);
    service.isAnswerShowing$.subscribe(v => {
      const expected = 'hide';
      const actual = v;
      expect(actual).toEqual(expected);
      done();
    })
  });

  /**
   * Before we had an array of values all in order.
   * 
   * Now a position in the array can be updated at any time
   * 
   * Use an object to track an items value
   */
  it('should return X given Y', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    service.answers$.subscribe(v => {
      const expected = {};
      const actual = v;
      expect(actual).toEqual(expected);
      done();
    })

  });

  it('should return X given Y', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    service.answers$.pipe(skip(1)).subscribe(v => {
      const expected = {my: 'value'};
      const actual = v;
      expect(actual).toEqual(expected);
      done();
    })

    service.updateAnswers({my: 'value'});
  });

  it('should return X given Y', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    service.answers$.pipe(skip(2)).subscribe(v => {
      const expected = {one: 'aaa', two: 'bbb'};
      const actual = v;
      expect(actual).toEqual(expected);
      done();
    })

    service.updateAnswers({one: 'aaa'});
    service.updateAnswers({two: 'bbb'});
  });

  it('should return X given Y', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    service.answers$.pipe(skip(3)).subscribe(v => {
      const expected = {};
      const actual = {};
      expect(actual).toEqual(expected);
      done();
    })

    service.updateAnswers({one: 'aaa'});
    service.updateAnswers({two: 'bbb'});
    service.updateActiveContent({question: 'any', answer: 'tons'});
  });
  

});
