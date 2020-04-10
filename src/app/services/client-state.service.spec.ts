import { TestBed } from '@angular/core/testing';

import { ClientStateService } from './client-state.service';
import { skip } from 'rxjs/operators';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { ContentStateService } from './content-state.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';

const fbAuthStub = {
  authState: of<any>({
    uid: "12345",
    photoUrl: "",
    memberStatus: 1,
    email: "Test@gmail.com",
    displayName: "Erik Test"
  }),

  auth: {
    signOut: function () {
      return Promise.resolve()
    },
    signInWithPopup: function (provider) {
      if (!provider) throw "sign in failed"
      return { user: {} };
    },
  }
};

// TODO: Refactor, this is all duplicated code just to test answer observables
describe('ClientStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule],
    providers: [{ provide: AngularFireAuth, useValue: fbAuthStub },
      { provide: AngularFirestore, useValue: {} }, 
      { provide: Router, useValue: {
        navigate: function () { return Promise.resolve() }
      } },
      FirebaseAuthService]
  }));

  it('should return hide given the observable was initially subscribed to', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);
    service.isAnswerShowing$.subscribe(v => {
      const expected = 'hide';
      const actual = v;
      expect(actual).toEqual(expected);
      done();
    })
  });

  /**
   * TODO: Redo tests for answers$
   */
  /*it('should return X given Y', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    service.answers$.subscribe(v => {
      const expected = {};
      const actual = v;
      expect(actual).toEqual(expected);
      done();
    })

  });

  it('Update', done => {
    const service: ClientStateService = TestBed.get(ClientStateService);

    service.answers$.pipe().subscribe(v => {
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
  });*/
  

});
