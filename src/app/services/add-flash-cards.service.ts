import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddFlashCardsService {

  constructor(private fs: FirestoreService) { }

  getCategories(userId) {
    if (!userId) return of(null); // TODO: Update from get to some form of 'changes'
    return this.fs.get(`categories`, userId).collection('items').valueChanges().pipe(
      tap(val => console.log('hey from inside my query')),
      map(item => item.filter(val => val.active).map(val => val.value), 
      shareReplay(1))
    )
  }

  postCategory(userId, entry) {
    if (!userId) return; // Add validation for entry
    this.fs.createItemsEntryById("categories", userId, entry);
  }

  postCard(userId) {
    if (!userId) return;
  }
}




/*
constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  getUsersCards(userId): Observable<any[]> {
    if (!userId) return of(null);
    const result = this.fs.get('flash_cards', userId);
    return result.collection('items').get().pipe(
      map(val => {
        // TODO: Is there a cleaner way to do this with this object?
        let flashCards = [];
        val.forEach(v => flashCards.push(v.data()));
        return flashCards;
      }));
  } */