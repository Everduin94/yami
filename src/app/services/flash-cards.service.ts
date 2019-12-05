import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsService {

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  getUsersCards(): Observable<any[]> {
    console.log(this.auth.userId); // TODO: This is dangerous, convert to a promise. Or unwrap user observable
    const result = this.fs.get('flash_cards', this.auth.userId);
    return result.collection('items').get().pipe(
      map(val => {
        // TODO: Is there a cleaner way to do this with this object?
        let flashCards = [];
        val.forEach(v => flashCards.push(v.data()));
        return flashCards;
      }));
  }
}
