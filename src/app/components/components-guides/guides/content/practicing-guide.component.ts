import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-practicing-guide',
  template: `
  
  <h1> Practicing Flashcards </h1>

  <div>Click the button labeled "Practice" in the top right corner. 

  This is where you will practice the cards you have made on the manage screen.
  </div>

  <div>
  Selecting a deck in the top left corner will load all cards for that deck.
  </div>

  <div class="box-shadow" *ngIf="aggregates$ | async as ems; else loading">
        <img [src]="ems"/>
  </div>

  <div class="inset">
  You can cycle through each card by clicking next (CTRL+SHIFT+Enter) or by clicking the exact card on the left.

  You can display answers by clicking Show Answer (CTRL+Enter)
  </div>

  <div>
  If you have added fill-in-blanks to your cards and the card type is "Fill In Blank (Cloze)", this will display if they are correct (green) incorrect (red)
  
  If you do not have fill-in-blanks, simply practice as you would with any other flash card.
  </div>

  <div class="box-shadow" *ngIf="aggregatesAnswer$ | async as ems; else loading">
        <img [src]="ems"/>
  </div>


  <ng-template #loading>
    <div class="mat-spinner-container">
        <mat-spinner [diameter]="30"></mat-spinner>
    </div>
  </ng-template>
  `,
  styleUrls: ['./content.css']
})
export class PracticingGuideComponent {

  aggregates$: Observable<string | null>;
  aggregatesAnswer$: Observable<string | null>;
  constructor(private storage: AngularFireStorage) {
    this.aggregates$ = this.storage.ref('practice-aggregate.png').getDownloadURL();
    this.aggregatesAnswer$ = this.storage.ref('aggregate-answer.png').getDownloadURL();
  }

}