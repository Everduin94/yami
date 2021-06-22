import { Component, OnInit } from '@angular/core';
import { FormControllerDirective } from '@components/components-manage/form-controller.directive';
import { ContentStateService } from 'src/app/services/content-state.service';

@Component({
  selector: 'app-deck-manager',
  templateUrl: './deck-manager.component.html',
  styleUrls: ['./deck-manager.component.css', '../../../common-styles.css']
})
export class DeckManagerComponent implements OnInit {

  aggregateGroupData$ = this.fc.aggregatedDecks$;
  deckRef$ = this.fc.deckRef$;

  constructor(public fc: FormControllerDirective, private cs: ContentStateService) {

  }

  ngOnInit() {
    this.fc.clearActiveCard();
  }

  saveDeck() {
    this.cs.dispatchSaveDeck({payload: { deck: this.fc.deck.value, group: this.fc.group.value}});
    this.fc.clearActiveCard();
  }
  
}
