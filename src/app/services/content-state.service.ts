import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap, tap, take, concatMap, withLatestFrom, delay, } from 'rxjs/operators';
import { Observable, of, Subject, from, combineLatest } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  categoryRef$: Observable<any[]> = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`decks`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id, group: val.group }))),
    shareReplay(1)
  );

  groupRef$ = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`groups`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id }))),
    shareReplay(1)
  );

  aggregatedDecks$ = combineLatest([this.categoryRef$, this.groupRef$]).pipe(
    map(([decks, groups]) => {
      return {
        defaultDecks: decks.filter(d => !d.group),
        groups: groups.map(g => ({...g, decks: decks.filter(d => d.group === g.id)}))
      }
    }),
    shareReplay(1)
  );

  saveDataEvent = new Subject<any>();
  saveData$ = this.saveDataEvent.asObservable().pipe(
    withLatestFrom(this.auth.userId$),
    concatMap(([event, userId]) => this.groupRef$.pipe(
      take(1),
      concatMap(groupRefs => {
        if (!event.payload.group) return of({value: '', id: ''});
        const groupRef = groupRefs.find(g => g.id === event.payload.group || g.value === event.payload.group);
        if (groupRef) return of(groupRef);
        else return this.addGroupToFS(
          userId,
          { active: true, value: event.payload.group }
        );
      }),

      concatMap(groupId => this.categoryRef$.pipe(
        take(1),
        concatMap(deckRefs => {
          const deckRef = deckRefs.find(d => d.id === event.payload.deck || d.value === event.payload.deck);
          if (deckRef) return of(deckRef);
          else return this.addCategoryToFS(
            userId,
            { active: true, value: event.payload.deck, group: groupId.id }
          );
        }),
        map(v => [{...event.payload, group: groupId.id, deck: v.id }, event.isExisting, userId])
      ))

    )),
    concatMap(([payload, existingId, userId]) => {
      if (existingId) return this.updateContentOnFS(userId, existingId, payload);
      else return this.addContentToFS(userId, payload);
    })
  );


  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) {
  
  }

  addCategoryToFS(userId, entry): Promise<any> {
    if (!userId) return; // Add validation for entry
    // this.fs.createItemsEntryById("categories", userId, entry);
    return this.fs.createItemsEntryById("decks", userId, entry);
  }

  addGroupToFS(userId, entry): Promise<any> {
    if (!userId) return; // Add validation for entry
    return this.fs.createItemsEntryById("groups", userId, entry);
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
    return collectionWithQuery.valueChanges({ idField: 'id' });
  }
}
