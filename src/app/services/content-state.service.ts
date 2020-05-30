import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { Observable, of, Subject, combineLatest } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  deckRef$: Observable<any[]> = this.auth.selectUserIdOrCancel(userId => {
    return this.fs.get(`decks`, userId).collection('items').valueChanges({ idField: 'id' }).pipe(
      map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id, group: val.group }))),
      shareReplay(1)
    );
  }, []);

  groupRef$ = this.auth.selectUserIdOrCancel(userId => {
    return this.fs.get(`groups`, userId).collection('items').valueChanges({ idField: 'id' }).pipe(
      map(item => item.filter(val => val.active).map(val => ({ value: val.value, id: val.id }))),
      shareReplay(1)
    )
  }, []);

  // TODO: This could be a server-side query (Denormalization)
  aggregatedDecks$ = combineLatest([this.deckRef$, this.groupRef$]).pipe(
    map(([decks, groups]) => {
      return {
        defaultDecks: decks.filter(d => !d.group),
        groups: groups.map(g => ({ ...g, decks: decks.filter(d => d.group === g.id) }))
      }
    }),
    shareReplay(1)
  );

  saveFlashCard = new Subject<any>();
  saveFlashCard$ = this.saveFlashCard.asObservable().pipe(
    switchMap(event => this.groupRef$.pipe(
      take(1),
      switchMap(groupRefs => {
        if (!event.payload.group) return of({ value: '', id: '' });
        const groupRef = groupRefs.find(g => g.id === event.payload.group || g.value === event.payload.group);
        if (groupRef) return of(groupRef);
        else return this.fsAddGroup({ active: true, value: event.payload.group });
      }),

      switchMap(groupId => this.deckRef$.pipe(
        take(1),
        switchMap(deckRefs => {
          const deckRef = deckRefs.find(d => d.id === event.payload.deck || d.value === event.payload.deck);
          if (deckRef) return of(deckRef);
          else return this.fsAddDeck({ active: true, value: event.payload.deck, group: groupId.id });
        }),
        map(v => [{ ...event.payload, group: groupId.id, deck: v.id }, event.isExisting])
      ))

    )),
    switchMap(([payload, existingId]) => {
      if (existingId) return this.fsUpdateFlashcard(existingId, payload);
      else return this.fsAddFlashcard(payload);
    })
  );

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  fsAddDeck(entry): Promise<DocumentReference> {
    return this.auth.getUserIdOrCancel(userId => this.fs.createItemsEntryById("decks", userId, entry))
  }

  fsAddGroup(entry): Promise<DocumentReference> {
    return this.auth.getUserIdOrCancel(userId => this.fs.createItemsEntryById("groups", userId, entry));
  }

  fsAddFlashcard(entry): Promise<DocumentReference> {
    return this.auth.getUserIdOrCancel(userId => this.fs.createItemsEntryById("flash_cards", userId, entry));
  }

  fsUpdateFlashcard(documentId, entry): Promise<void> {
    return this.auth.getUserIdOrCancel(userId => this.fs.updateItemsEntryById("flash_cards", userId, documentId, entry));
  }

  fsDeleteFlashcard(entryId): Promise<void> {
    return this.auth.getUserIdOrCancel(userId => this.fs.deleteItemsEntryById("flash_cards", userId, entryId));
  }

  fsGetAllFlashcards(deck): Observable<any[]> {
    return this.auth.selectUserIdOrCancel(userId => 
      this.fs.get('flash_cards', userId)
        .collection('items', ref => ref.where('deck', '==', deck))
        .valueChanges({ idField: 'id' }), [])
  }
}
