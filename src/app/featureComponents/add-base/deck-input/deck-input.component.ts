import { Component, OnInit, Input } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';

@Component({
  selector: 'app-deck-input',
  templateUrl: './deck-input.component.html',
  styleUrls: ['./deck-input.component.css']
})
export class DeckInputComponent implements OnInit {

  @Input() form;
  @Input() decks;
  @Input() groups;

  readonly addIcon = faPlusCircle;
  readonly backIcon = faLongArrowAltLeft;

  showAddDeck = false;
  showAddGroup = false;
  

  constructor() { }

  ngOnInit() {
  }

}
