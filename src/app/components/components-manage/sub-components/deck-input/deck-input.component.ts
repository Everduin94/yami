import { Component, Input } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { FormGroup } from '@angular/forms';
import { FormControllerDirective } from '@components/components-manage/form-controller.directive';

@Component({
  selector: 'app-deck-input',
  templateUrl: './deck-input.component.html',
  styleUrls: ['./deck-input.component.css']
})
export class DeckInputComponent  {

  @Input() form: FormGroup;
  @Input() decks;

  allGroups = [];
  _groups;
  @Input() set groups (update) {
    console.log('update', update)
    this._groups = update;
    this.allGroups = this._groups.groups.map(g => ({value: g.value, id: g.value}));
    
  }
  get groups() {
    return this._groups
  }
  // TODO: make a map of all groups
  
  readonly addIcon = faPlusCircle;
  readonly backIcon = faLongArrowAltLeft;

  constructor(public fc: FormControllerDirective) { }

  clearForm() {
    this.clearGroup();
    this.clearDeck();
  }

  public clearDeck = () => this.fc.deck.reset();
  public clearGroup = () => this.fc.group.reset();
  public returnToForm = () => this.fc.returnToForm();
  
}
