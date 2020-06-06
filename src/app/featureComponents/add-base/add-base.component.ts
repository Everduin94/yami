import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FibUtil } from './fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';
import { Subscription, Subject } from 'rxjs';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { skip } from 'rxjs/operators';

export enum ManageEventType {
  ADD,
  DELETE,
  COPY,
  UPDATE_FORM
}

export interface ManageEvent {
  type: ManageEventType | string,
  payload?: {}
}

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css', '../../components/common-styles.css']
})
export class AddBaseComponent implements OnInit, OnDestroy {

  readonly textAreaPlaceholder = `# Heading\n## Sub Heading\n### ...\nList\n- One\n- Two\nFIB Fill in blank FIB\n**Bold**\n*Italics*\n--- (line)`
  
  form: FormGroup;
  formSubscriptions: Subscription = new Subscription();

  formSubmittedEvent = new Subject();
  formSubmittedEvent$ = this.formSubmittedEvent.asObservable();

  readonly questionIcon = faQuestion;

  @ViewChild('title', { static: false }) titleElement;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService) { 
  }

  ngOnInit() {

    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl(''),
      previewMode: new FormControl(false),
      group: new FormControl(''),
      deck: new FormControl('', [Validators.required]),
      type: new FormControl('basic', [Validators.required]),
    });

    const clientDeckSub = this.client.deck$.pipe(skip(1)).subscribe(deck => {
      const formDeck = this.deck.value;
      if (formDeck !== deck) this.addRow(true);
      this.deck.patchValue(deck, {emitEvent:false});
    })

    const activeContentSub = this.client.flashCards$.subscribe((v:any) => {
      if (v.activeCard.id) this.form.patchValue(v.activeCard, {emitEvent: false})
    });

    const saveFlashCard = this.cs.saveFlashCard$.subscribe();

    this.formSubscriptions.add(clientDeckSub);
    this.formSubscriptions.add(activeContentSub);
    this.formSubscriptions.add(saveFlashCard);
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }

  consumeActionEvent(manageEvent: ManageEvent) {
    if (manageEvent.type === ManageEventType.ADD) this.addRow();
    if (manageEvent.type === ManageEventType.COPY) this.copyRow();
    if (manageEvent.type === ManageEventType.DELETE) this.deleteRow(manageEvent.payload);
    if (manageEvent.type === ManageEventType.UPDATE_FORM) this.updateForm(manageEvent.payload);
  }

  onSubmit(activeContent) {

    const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.type.value === 'fib' ? this.question.value : this.answer.value,
      type: this.type.value ? this.type.value : 'basic',
      deck: this.deck.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),
      group: this.group.value
    };

    this.cs.saveFlashCard.next({payload, isExisting: activeContent.id});

    const deck = this.deck.value;
    const type = this.type.value;
    this.form.reset({deck, type});
    this.client.setActiveFlashcard({});
    this.formSubmittedEvent.next();
  }

  addRow(vetoFocus = false) {
    this.client.setActiveFlashcard({});

    if (this.titleElement && this.titleElement.inputElement && !vetoFocus) { // TODO: Use Renderer / update to Question?
      this.titleElement.inputElement.nativeElement.focus();
    }
    
    const deck = this.deck.value;
    const group = this.group.value;
    const type = this.type.value;
    this.form.reset({deck, group, type});
  }

  cancel(activeCard) {
    if (activeCard.id) this.form.reset(activeCard);
    else this.addRow();
  }

  async deleteRow(selection) {

    if (window.confirm('Are you sure you want to delete this card?')) {
      await this.cs.fsDeleteFlashcard(selection.id);
      this.client.setActiveFlashcard({});
      const deck = this.deck.value;
      const type = this.type.value;
      this.form.reset({deck, type});
    }
    
  }

  async copyRow() {
    const title = this.title.value + ' (copy)';
    const payload = {
      title: title,
      question: this.question.value,
      answer: this.type.value === 'fib' ? this.question.value : this.answer.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),

      deck: this.deck.value,
      type: this.type.value ? this.type.value : 'basic',
      group: this.group.value
    };

    const copiedCard = await this.cs.fsAddFlashcard(payload);
    this.client.setActiveFlashcard({id: copiedCard.id});
  }

  updateForm(event) {
    this.form.patchValue(event);
  }

  returnToForm(activeContent) {
    this.deck.patchValue(activeContent.deck);
    this.group.patchValue(activeContent.group);
  }

  /* Getters */
  get group() {
    return this.form.get('group');
  }

  get deck() {
    return this.form.get('deck');
  }

  get type() {
    return this.form.get('type');
  }

  get title() {
    return this.form.get('title');
  }

  get question() {
    return this.form.get('question');
  }

  get answer() {
    return this.form.get('answer');
  }

  get previewMode() {
    return this.form.get('previewMode');
  }

}
