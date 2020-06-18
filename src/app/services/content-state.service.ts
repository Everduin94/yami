import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map, shareReplay, switchMap, take, tap, switchMapTo } from 'rxjs/operators';
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


  aggregatedDecks$ = this.fsSelectAggregateDecks().pipe(
    map(decks => {
      
      const groupMapping = new Map();
      decks.forEach(d => {
        if (d.group && groupMapping.has(d.group)) groupMapping.set(d.group, [...groupMapping.get(d.group), {value: d.value, id: d.id}])
        else if (d.group) groupMapping.set(d.group, [{value: d.value, id: d.id}]);
      });
      const groups = Array.from(groupMapping, ([value, decks]) => ({ value, decks }));

      console.log(groups);

      return { defaultDecks: decks.filter(d => !d.group), groups };
    })
  )

  // TODO: This could be a server-side query (Denormalization)
  /* aggregatedDecks$ = combineLatest([this.deckRef$, this.groupRef$]).pipe(
    map(([decks, groups]) => {
      return {
        defaultDecks: decks.filter(d => !d.group),
        groups: groups
        .map(g => ({ ...g, decks: decks.filter(d => d.group === g.id) }))
        .filter(g => g.decks.length !== 0)
      }
    }),
    shareReplay(1)
  ); */

  fsSelectAggregateDecks(): Observable<any[]> {
    return this.auth.selectUserIdOrCancel(auth => this.fs.selectAggregateDecks(auth)).pipe(
      map(d => d.decks)
    )
  }

/*
Get Aggregate Data [x]
Set Aggregate Data [x]

Situational
------------
Replace aggregateData [x]
Replace Save Card
Saving Aggregate Data [x]


06/17/2020:
- Remove groupref and deckref usage from details dropdown [X]
- SaveDeck is using groupRef and DeckRef to determine what exists, use aggregate w/ value instead. []
  - Also, I don't think that group having an id matters anymore.
  - It's going to get added to the deck as is.
- In the future, find a way to add a deck without the 2 network calls (first is to make id).
  - Note, push does not work because push adds an ID to document (also I can't find it in angularfire api)

*/




  testAggregate$ = combineLatest([this.deckRef$, this.groupRef$]).pipe(
    map(([decks, groups]) => {
      
      const aggregateDecks = decks.map(d => d.group ? 
        {id: d.id, value: d.value, group: groups.find(g => g.id === d.group).value} 
        : {id: d.id, value: d.value, group: d.group});

      return {decks: aggregateDecks};
    }),
    switchMap(val => 
      this.auth.getUserIdOrCancel(auth => this.fs.testSave('aggregateDeck', auth, val))
    ),
    switchMapTo(this.fsSelectAggregateDecks()),
    tap(console.log),
  ).subscribe();

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
          else return this.fsAddDeck({ active: true, value: event.payload.deck, group: groupId.id, groupValue: groupId.value });
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

    return this.fsSelectAggregateDecks().pipe(
      take(1),
      switchMap((aggregateDecks: any[]) => {
        return this.auth.getUserIdOrCancel(async (userId) => {
          const newDeck = await this.fs.createItemsEntryById("decks", userId, entry)
          const update = {value: entry.value, group: entry.groupValue, id: newDeck.id};
          aggregateDecks.push(update);
          this.fs.getAggregateDecks(userId).set({decks: aggregateDecks});
          return this.fs.createItemsEntryById("decks", userId, entry)
        })
      })
    ).toPromise();

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

  fsSelectAllFlashcards(deck): Observable<any[]> {
    return this.auth.selectUserIdOrCancel(userId => 
      this.fs.get('flash_cards', userId)
        .collection('items', ref => ref.where('deck', '==', deck))
        .valueChanges({ idField: 'id' }), [])
  }
}
