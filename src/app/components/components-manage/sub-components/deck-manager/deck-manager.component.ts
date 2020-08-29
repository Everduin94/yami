import { Component, OnInit } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FunctionsService } from 'src/app/services/functions.service';



@Component({
  selector: 'app-deck-manager',
  templateUrl: './deck-manager.component.html',
  styleUrls: ['./deck-manager.component.css']
})
export class DeckManagerComponent  {

  aggregateGroupData$ = this.cs.aggregatedDecks$;

  constructor(private cs: ContentStateService, private fns: FunctionsService) {

  }
  
}
