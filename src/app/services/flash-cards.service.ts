import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsService {

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  getUsersCards() {
    const result = this.fs.get('flash_cards', this.auth.userId);
    result.collection('items').get().subscribe(val => {
      val.forEach(val => console.log(val.data()));
    });
  }
}
