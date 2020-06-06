import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControllerDirective } from '@components/components-manage/form-controller.directive';

@Component({
  selector: 'app-deck-input',
  templateUrl: './deck-input.component.html',
  styleUrls: ['./deck-input.component.css']
})
export class DeckInputComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() decks;
  @Input() groups;
  
  readonly addIcon = faPlusCircle;
  readonly backIcon = faLongArrowAltLeft;

  showAddDeck = false;
  showAddGroup = false;

  subs = new Subscription();

  constructor(private formController: FormControllerDirective) { }

  ngOnInit() {
    this.subs.add(this.formController.formSubmittedEvent.pipe(
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
  public returnToForm = () => this.formController.returnToForm();
  
}
