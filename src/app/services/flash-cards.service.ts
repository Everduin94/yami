import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { Observable, of } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsService {

  constructor(private fs: FirestoreService, private auth: FirebaseAuthService) { }

  getUsersCards(userId, query?: QueryFn): Observable<any[]> {
    if (!userId) return of(null);
    const fcDoc = this.fs.get('flash_cards', userId);
    const collectionWithQuery = query ? fcDoc.collection('items', query) : fcDoc.collection('items')
    return collectionWithQuery.valueChanges({idField: 'id'});
  }
}
