import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, tap, map, shareReplay, take } from 'rxjs/operators';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  user$;
  private errors = new BehaviorSubject(null);
  public errors$ = this.errors.asObservable();

  userId$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null))
    )

    this.userId$ = afAuth.authState.pipe(
      map(user => user ? user.uid : null),
      shareReplay(1)
    );
  }

  // TODO: Global error handler + Logging on Backend
  async signIn(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.errors.next(null);
      this.updateUserData(credential.user);
      this.router.navigate(['/']);
    } catch (e) {
      this.errors.next({ message: "Failed to Login!", exception: e })
    }
  }

  async signOut() {
    try {
      await this.afAuth.auth.signOut();
      this.errors.next(null);
      this.router.navigate(['/']);
    } catch (e) {
      this.errors.next({ message: "Failed to Sign-out!", exception: e });
    }
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
