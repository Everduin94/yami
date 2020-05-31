import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, map, shareReplay, first } from 'rxjs/operators';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private errors = new BehaviorSubject(null);
  public errors$ = this.errors.asObservable();

  public user$ = this.afAuth.authState.pipe(
    switchMap(user => user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null))
  )

  public userId$: Observable<string | null> = this.afAuth.authState.pipe(
    map(user => user ? user.uid : null),
    shareReplay(1)
  );

  public getUserId(): Promise<any> {
    return this.userId$.pipe(first()).toPromise();
  }

  public getUserIdOrCancel(fn: (user: string) => Observable<any> | Promise<any>, defaultValue = null): Promise<any> {
    return this.userId$.pipe(
      switchMap(user =>  user ? fn(user) : of(defaultValue)),
      first()
    ).toPromise();
  }

  public selectUserIdOrCancel(fn: (user: string) => Observable<any> | Promise<any>, defaultValue = null) : Observable<any>  {
    return this.userId$.pipe(switchMap(user =>  user ? fn(user) : of(defaultValue)));
  }

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  // TODO: Global error handler + Logging on Backend
  async signIn(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.errors.next(null);
      this.updateUserData(credential.user);
      this.router.navigate(['/guides']);
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
