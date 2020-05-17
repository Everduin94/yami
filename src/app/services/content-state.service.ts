import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap, tap, take, concatMap, delay, withLatestFrom } from 'rxjs/operators';
import { Observable, of, Subject, from } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';
import { ClientStateService } from './client-state.service';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  categoryRef$: Observable<any[]> = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`categories`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id, group: val.group }))),
    shareReplay(1)
  );

  groupRef$ = this.auth.userId$.pipe(
    switchMap(id => this.fs.get(`groups`, id).collection('items').valueChanges({ idField: 'id' })),
    map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id }))),
    shareReplay(1)
  );


  // TODO: We may need to add validation if the field already exists?

  saveDataEvent = new Subject<any>();
  saveData$ = this.saveDataEvent.asObservable().pipe(
    concatMap(event => this.groupRef$.pipe(
      take(1),
      tap(v => console.log('Group ref emission:', event)),
      concatMap(groupRefs => {
        const groupRef = groupRefs.find(g => g.id === event.payload.group);
        if (groupRef) return of(groupRef);
        else return this.addGroupToFS(
          'vEgiUKTcUBOY4RuzXTjPTkKfBYA2',
          { active: true, value: event.payload.group }
        );
      }),

      concatMap(groupId => this.categoryRef$.pipe(
        take(1),
        concatMap(deckRefs => {
          const deckRef = deckRefs.find(d => d.id === event.payload.deck);
          if (deckRef) return of(deckRef);
          else return this.addCategoryToFS(
            'vEgiUKTcUBOY4RuzXTjPTkKfBYA2',
            { active: true, value: event.payload.deck, group: groupId.id }
          );
        }),
        map(v => [{...event.payload, group: groupId.id, deck: v.id }, event.existingId])
      ))

    )),
    concatMap(([payload, existingId]) => { 
      console.log(existingId)
      if (existingId) return this.updateContentOnFS('vEgiUKTcUBOY4RuzXTjPTkKfBYA2', existingId, payload);
      else return this.addContentToFS('vEgiUKTcUBOY4RuzXTjPTkKfBYA2', payload);
    })
  );


  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) {

  }

  addCategoryToFS(userId, entry): Promise<any> {
    if (!userId) return; // Add validation for entry
    console.log('adding deck!')
    // this.fs.createItemsEntryById("categories", userId, entry);
    return this.fs.createItemsEntryById("decks", userId, entry);
  }

  addGroupToFS(userId, entry): Promise<any> {
    if (!userId) return; // Add validation for entry
    console.log('adding!')
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
