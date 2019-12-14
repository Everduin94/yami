import { Injectable } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';

@Injectable({
  providedIn: 'root'
})
export class PrototypeService {

  constructor(private fs: FlashCardsService) { }

  getCards() {
    // return this.fs.getUsersCards();
  }
}
