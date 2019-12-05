import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './firebase-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../models/user.model';

const fbAuthStub = {
  authState: of<User>({
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

const fbStoreStub = {

}

const routerStub = {
  navigate: function () { return Promise.resolve() }
}

describe('FirebaseAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: fbAuthStub },
        { provide: AngularFirestore, useValue: fbStoreStub },
        { provide: Router, useValue: routerStub },
      ]
    });
  }
  );

  test('test-1', () => {
    const service: FirebaseAuthService = TestBed.get(FirebaseAuthService);
    expect(service).toBeTruthy();

    jest.spyOn(service, 'updateUserData').mockImplementation(() => Promise.resolve());
    const routerSpy = jest.spyOn(routerStub, 'navigate');
    let provider = null;
    service.signIn(provider); // Fail
    service.errors$.subscribe(val => {
      expect(val).toBeTruthy();
      expect(routerSpy).not.toHaveBeenCalled();
    }).unsubscribe();

    provider = 'supplied';
    service.signIn(provider); // Succeed
    service.errors$.subscribe(val => { 
      expect(val).toBe(null);
      expect(routerSpy).toHaveBeenCalledTimes(1);
    }).unsubscribe();
    service.signOut();
    service.errors$.subscribe(val => {
       expect(val).toBe(null)
       expect(routerSpy).toHaveBeenCalledTimes(2);
    }).unsubscribe();
    
  });


});
