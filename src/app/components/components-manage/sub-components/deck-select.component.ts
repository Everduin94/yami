import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-deck-select',
  template: `
    <mat-form-field style="margin-right: 5px;">
      <mat-label>Deck</mat-label>
      <mat-select data-cy="category" (selectionChange)="selectionChangeEvent($event)" [value]="deck">

        <mat-option *ngFor="let defaultDeck of groups?.defaultDecks" [value]="defaultDeck.id">
          {{defaultDeck.value}}        
        </mat-option>
        <mat-optgroup *ngFor="let group of groups?.groups" [label]="group.value">
          <mat-option *ngFor="let deck of group.decks" [value]="deck.id">
            {{deck.value}}
          </mat-option>
        </mat-optgroup>

      </mat-select>
    </mat-form-field>
  `,
  styles: []
})
export class DeckSelectComponent implements OnInit {

  // TODO: Finish implementing, replace @ filter list and manage/flash-cards-details

  @Input() deck;
  @Input() groups;

  @Output() selectionChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectionChangeEvent(event) {
    this.selectionChange.emit(event);
  }

}
