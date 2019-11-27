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
  })
};

const fbStoreStub = {

}

const routerStub = {

}

describe('FirebaseAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    providers: [
      { provide: AngularFireAuth, useValue: fbAuthStub},
      { provide: AngularFirestore, useValue: fbStoreStub},
      { provide: Router, useValue: routerStub},
    ]
  }));

  test('create-fb-auth', () => {
    const service: FirebaseAuthService = TestBed.get(FirebaseAuthService);
    expect(service).toBeTruthy();
  });
});
