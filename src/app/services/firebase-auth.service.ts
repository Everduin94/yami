import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  user$;
  userId;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = afAuth.authState.pipe(
      tap(user => this.userId = user ? user.uid : null ),
      switchMap(
        user => user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null)
      )
    )
  }

  async signIn(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.updateUserData(credential.user);
      this.router.navigate(['/']);
    } catch (e) {
      console.log('caught ya! hehe!')
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      memberStatus: 1
    }

    return userRef.set(data, { merge: true });
  }
}
