import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  categoryRef$ = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`categories`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id }))),
    shareReplay(1)
  );

  groupRef$ = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`groups`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id }))),
    shareReplay(1)
  );

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  addCategoryToFS(userId, entry) {
    if (!userId) return; // Add validation for entry
    this.fs.createItemsEntryById("categories", userId, entry);
    this.fs.createItemsEntryById("decks", userId, entry);
  }

  addGroupToFS(userId, entry) {
    if (!userId) return; // Add validation for entry
    this.fs.createItemsEntryById("groups", userId, entry);
  }

  readContentFromFS(userId, id) {
    if (!userId) return;
    return this.fs.getItemById("flash_cards", userId, id);
  }

  addContentToFS(userId, entry) {
    if (!userId) return;
    return this.fs.createItemsEntryById("flash_cards", userId, entry);
  }

  updateContentOnFS(userId, documentId, entry) {
    return this.fs.updateItemsEntryById("flash_cards", userId, documentId, entry);
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
