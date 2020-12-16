import { Directive, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ClientStateService } from 'src/app/services/client-state.service';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { FibUtil } from '@components/components-manage/fib-util';
import { Subscription, Subject, combineLatest } from 'rxjs';
import { skip, tap, map, switchMap, first, take, shareReplay } from 'rxjs/operators';

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

@Directive({
  selector: '[appFormController]'
})
export class FormControllerDirective {

  @Input() activeContent;

  readonly questionIcon = faQuestion;
  readonly textAreaPlaceholder = `# Heading\n## Sub Heading\n### ...\nList\n- One\n- Two\nFIB Fill in blank FIB\n**Bold**\n*Italics*\n![Image Description](Your Image URL)\n[Hyperlink Text](Your URL)`
  private readonly addEvent = new Subject();
  public readonly addEvent$ = this.addEvent.asObservable();
  public readonly deckRef$ = this.cs.deckRef$;
  public readonly groupRef$ = this.cs.groupRef$;
  public readonly selectedDeck$ = this.client.deck$;
  public readonly aggregatedDecks$ = this.cs.aggregatedDecks$
  @Output() isDirty = new EventEmitter(); // Workaround for Dirty Guard -- Emits isDirty$ Emissions
  public isDirty$; 

  showAddDeck = false;
  showAddGroup = false;

  form: FormGroup;
  formSubscriptions: Subscription = new Subscription();

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

    // This is the same emission #1
    const clientDeckSub = this.client.deck$.pipe(skip(1)).subscribe(deck => {
      const formDeck = this.deck.value;
      if (formDeck !== deck) this.addRow();
      this.deck.patchValue(deck, {emitEvent:false});
      [this.showAddDeck, this.showAddGroup] = [false, false];
    })

    // This is the same emission #2
    const activeContentSub = this.client.flashCards$.subscribe((v:any) => { 
      if (v.activeCard && v.activeCard.id) {
        this.form.patchValue(v.activeCard, {emitEvent: false})
        this.showAddDeck = false;
        this.showAddGroup = false;
      } // TODO: Probably should replace with activeCard$
    });

    const saveFlashCard = this.cs.saveFlashCard$.pipe(
      switchMap(_ => this.client.activeCard$.pipe(first())),
      tap(activeCard => this.cancel(activeCard))
    ).subscribe();

    const showAddDeckIfNoDecks = this.deckRef$.subscribe(deckRef => {
      if (deckRef && deckRef.length === 0) this.showAddDeck = true;
    })

    this.isDirty$ = combineLatest([this.form.valueChanges, this.client.flashCards$]).pipe(
      map(([v, snapshot]) =>{
        const activeCard:any = snapshot.activeCard;
        if (!activeCard) return false;
        return v.title != activeCard.title
          || v.type != activeCard.type
          || v.question != activeCard.question
          || v.answer != activeCard.answer
          || v.deck != activeCard.deck
          || v.group != activeCard.group;   
      }),
      tap(v => this.isDirty.emit(v)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );

    this.formSubscriptions.add(clientDeckSub);
    this.formSubscriptions.add(activeContentSub);
    this.formSubscriptions.add(saveFlashCard);
    this.formSubscriptions.add(showAddDeckIfNoDecks);
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }

  consumeActionEvent(manageEvent: ManageEvent) {
    if (manageEvent.type === ManageEventType.ADD)  {
      this.addRow();
      this.addEvent.next();
    }
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
      group: this.group.value == null ? '' : this.group.value
    };

    this.cs.saveFlashCard.next({payload, isExisting: activeContent.id});
    [this.showAddDeck, this.showAddGroup] = [false, false];

    this.client.deck$.pipe(take(1)).subscribe(v => {
      if (payload.deck === v) return; 
      this.client.updateCategory(payload.deck);
    })
    
    this.form.reset(payload);
  }

  addRow() {
    this.client.setActiveFlashcard({
      flashcard: {
        deck: this.deck.value,
        group: this.group.value,
        type: this.type.value,
      }
    });
    const deck = this.deck.value;
    const group = this.group.value;
    const type = this.type.value;
    this.form.reset({deck, group, type});
  }

  cancel(activeCard) {
    if (activeCard && activeCard.id) this.form.reset(activeCard);
    else this.addRow();
    [this.showAddDeck, this.showAddGroup] = [false, false];
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

  returnToForm() {
    this.deck.patchValue(this.activeContent.deck);
    this.group.patchValue(this.activeContent.group);
  }

  /* Getters */
  get group() { return this.form.get('group') }
  get deck() { return this.form.get('deck') }
  get type() { return this.form.get('type') }
  get title() { return this.form.get('title') }
  get question() { return this.form.get('question') }
  get answer() { return this.form.get('answer') }
  get previewMode() { return this.form.get('previewMode') }

}
