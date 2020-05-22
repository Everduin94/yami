import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-deck-input',
  templateUrl: './deck-input.component.html',
  styleUrls: ['./deck-input.component.css']
})
export class DeckInputComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() decks;
  @Input() groups;
  @Input() formSubmittedEvent: Observable<any>;
  @Output() returnedToForm = new EventEmitter();
  

  readonly addIcon = faPlusCircle;
  readonly backIcon = faLongArrowAltLeft;

  showAddDeck = false;
  showAddGroup = false;

  subs = new Subscription();

  constructor() { }

  ngOnInit() {
    this.subs.add(this.formSubmittedEvent.pipe(
      tap(v => {
        this.showAddDeck = false;
        this.showAddGroup = false;
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  clearForm() {
    this.clearGroup();
    this.clearDeck();
  }

  private clearDeck = () => this.form.get('deck').reset();
  private clearGroup = () => this.form.get('group').reset();
  private returnToForm = () => this.returnedToForm.emit();
  
}
