import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  private activeContent: BehaviorSubject<any> = new BehaviorSubject<any>({
    title: '',
    question: '',
    answer: '',
    category: ''
  });
  public activeContent$: Observable<any> = this.activeContent.asObservable();

  /**
   * Hypothetical testing
   * 
   * Would have to mock or simulate the result of userId$
   * Would have to mock fs call just to pass obs result to map
   * Would then test map. Which executes a pure function
   * - At what point do I just extract the pure function and test that normally?
   * Then does shareReplay, which suggests it is hot. But shareReplay is battle-tested,
   * I know that it is hot and should work as intended.
   */
  categoryRef$ = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`categories`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id }))),
    shareReplay(1)
  );

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  public updateActiveContent(value) {
    this.activeContent.next(value);
  }

  addCategoryToFS(userId, entry) {
    if (!userId) return; // Add validation for entry
    this.fs.createItemsEntryById("categories", userId, entry);
  }

  addContentToFS(userId, entry) {
    if (!userId) return;
    this.fs.createItemsEntryById("flash_cards", userId, entry);
  }

  deleteContentFromFS(userId, entryId) {
    if (!userId) return;
    this.fs.deleteItemsEntryById("flash_cards", userId, entryId);
  }

  getUsersContentFromFS(userId, query?: QueryFn): Observable<any[]> {
    if (!userId) return of(null);
    const fcDoc = this.fs.get('flash_cards', userId);
    const collectionWithQuery = query ? fcDoc.collection('items', query) : fcDoc.collection('items')
    return collectionWithQuery.valueChanges({idField: 'id'});
  }
}
