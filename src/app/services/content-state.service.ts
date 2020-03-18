import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  private activeContent: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public activeContent$: Observable<any> = this.activeContent.asObservable();

  categoryRef$ = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`categories`, id).collection('items').valueChanges({idField: 'id'})),
    map(item => item.filter(val => val.active).map(val => ({value: val.value, id: val.id}))), 
    shareReplay(1)
  );
  
  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  public updateActiveContent(value) {
    this.activeContent.next(value);
  }
}
