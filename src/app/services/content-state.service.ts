import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { filter, map, mapTo, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

type DeckPayload = {payload: { deck: string, group: string }}

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {

  aggregatedDecks$ = this.fsSelectAggregateDecks().pipe(
    map(decks => {
      const groupMapping = new Map();
      decks.forEach(d => {
        if (d.group && groupMapping.has(d.group)) groupMapping.set(d.group, [...groupMapping.get(d.group), { value: d.value, id: d.id, group: d.group }])
        else if (d.group) groupMapping.set(d.group, [{ value: d.value, id: d.id, group: d.group }]);
      });
      const groups = Array.from(groupMapping, ([value, decks]) => ({ value, decks }));

      return { defaultDecks: decks.filter(d => !d.group), groups };
    }),
    shareReplay(1)
  )

  deckRef$: Observable<any[]> = this.aggregatedDecks$.pipe(
    map(decks => [...decks.defaultDecks,
    ...decks.groups
      .map(g => g.decks)
      .reduce((acc, curr) => [...curr, ...acc], [])]),
    shareReplay(1)
  );

  groupRef$: Observable<any[]> = this.aggregatedDecks$.pipe(
    map(decks => [...decks.groups.map(g => ({ value: g.value }))]),
    shareReplay(1)
  );

  saveFlashCard = new Subject<any>();
  saveFlashCard$ = this.saveFlashCard.pipe(
    filter(v => v && v.payload.deck && v.payload.title),
    switchMap(event => this.deckRef$.pipe(
      take(1),
      switchMap(deckRefs => {
        const deckRef = deckRefs.find(d => d.id === event.payload.deck || d.value === event.payload.deck);
        if (deckRef) return of(deckRef.id);
        else return this.fsAddDeck({ active: true, value: event.payload.deck, group: event.payload.group });
      }),
      map(id => [{ ...event.payload, group: event.payload.group, deck: id }, event.isExisting])
    )),
    switchMap(([payload, existingId]) => {
      if (existingId) return this.fsUpdateFlashcard(existingId, payload);
      else return this.fsAddFlashcard(payload);
    })
  );

  
  private saveDeckDispatcher = new ReplaySubject<DeckPayload>(1);
  public saveDeckListener$: Observable<void> = this.saveDeckDispatcher.pipe(
    switchMap(event => this.deckRef$.pipe(
      take(1),
      switchMap(deckRefs => {
        const deckRef = deckRefs.find(d => d.id === event.payload.deck || d.value === event.payload.deck);
        if (deckRef) return of(deckRef.id);
        else return this.fsAddDeck({ active: true, value: event.payload.deck, group: event.payload.group });
      }),
      mapTo(undefined)
    )),
  );
  public dispatchSaveDeck = (deck: DeckPayload) => this.saveDeckDispatcher.next(deck);  

  fsAddDeck(entry): Promise<any> {
    return this.fsSelectAggregateDecks().pipe(
      take(1),
      switchMap((aggregateDecks: any[]) => {
        return this.auth.getUserIdOrCancel(async (userId) => {
          const newDeck = await this.fs.createItemsEntryById("decks", userId, entry)
          const update = { value: entry.value, group: entry.group, id: newDeck.id };
          aggregateDecks.push(update);
          await this.fs.getAggregateDecks(userId).set({ decks: aggregateDecks });
          return newDeck.id;
        })
      })
    ).toPromise();
  }

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  // TODO: Not used
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

  fsSelectAllFlashcards(deck): Observable<any[]> {
    return this.auth.selectUserIdOrCancel(userId =>
      this.fs.get('flash_cards', userId)
        .collection('items', ref => ref.where('deck', '==', deck))
        .valueChanges({ idField: 'id' }), [])
  }

  fsSelectAggregateDecks(): Observable<any[]> {
    return this.auth.selectUserIdOrCancel(auth => this.fs.selectAggregateDecks(auth)).pipe(
      map(d => d ? d.decks : [])
    )
  }

}
