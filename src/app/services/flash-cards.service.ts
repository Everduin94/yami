import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsService {

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
  }
}
