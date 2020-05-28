import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FibUtil } from './fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';
import { Subscription, combineLatest, Subject } from 'rxjs';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { withLatestFrom, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit, OnDestroy {

  readonly textAreaPlaceholder = `# Heading\n## Sub Heading\n### ...\nList\n- One\n- Two\nFIB Fill in blank FIB\n**Bold**\n*Italics*\n--- (line)`
  
  form: FormGroup;
  showAddCategory = false;
  formSubscriptions: Subscription = new Subscription();

  formSubmittedEvent = new Subject();
  formSubmittedEvent$ = this.formSubmittedEvent.asObservable();

  readonly questionIcon = faQuestion;

  @ViewChild('title', { static: false }) titleElement;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService) { 
    
  }

  ngOnInit() {

    this.form = this.fb.group({
      category: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      
      
      question: new FormControl('', [Validators.required]),
      answer: new FormControl(''),
      previewMode: new FormControl(false),

      group: new FormControl(''),
      deck: new FormControl('', [Validators.required]),
      type: new FormControl('basic', [Validators.required]),
      
    });

    const activeContentSub = this.client.activeContent$.subscribe(v => {
      this.form.patchValue(v, {emitEvent: false})
    });

    const clientDeckSub = this.client.deck$.pipe(
      withLatestFrom(this.client.activeContent$)
    ).subscribe(v => {
      const deck = v[0];
      const activeContent = v[1];
      if (activeContent && activeContent.deck !== deck) this.addRow(true);
      this.deck.patchValue(v[0], {emitEvent:false});
    })

    const contentByIdSub = this.client.activeContentById$.subscribe();

    const saveDataSub = this.cs.saveData$.subscribe();

    this.formSubscriptions.add(activeContentSub);
    this.formSubscriptions.add(clientDeckSub);
    this.formSubscriptions.add(contentByIdSub);
    this.formSubscriptions.add(saveDataSub);
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }


  onSubmit(userId, activeContent) {

    const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.type.value === 'fib' ? this.question.value : this.answer.value,
      type: this.type.value ? this.type.value : 'basic',
      deck: this.deck.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),
      group: this.group.value
    };

    this.cs.saveDataEvent.next({payload, isExisting: activeContent.id});

    const deck = this.deck.value;
    this.form.reset({deck});
    this.client.updateActiveContent({type: 'basic'});
    this.formSubmittedEvent.next();
  }

  addRow(vetoFocus = false) {
    this.client.updateActiveContent({
      answer: '',
      question: '',
      title: '',

      type: 'basic',
      deck: this.deck.value,
      group: this.group.value
    });

    if (this.titleElement && this.titleElement.inputElement && !vetoFocus) { // TODO: Use Renderer / update to Question?
      this.titleElement.inputElement.nativeElement.focus();
    }
    
    const deck = this.deck.value;
    const group = this.group.value;
    const type = this.type.value;
    this.form.reset({deck, group, type});
  }

  cancel(selection) {
    this.form.reset(selection);
  }

  async deleteRow(userId, selection) {

    if (window.confirm('Are you sure you want to delete this card?')) {
      await this.cs.deleteContentFromFS(selection.id).toPromise();
      const deck = this.deck.value;
      this.form.reset({deck});
      this.client.updateActiveContent({type: 'basic'});
    }
    
  }

  async copyRow(userId, activeContent) {
    const title = this.title.value + ' (copy)';
    console.log(title);
    const payload = {
      title: title,
      question: this.question.value,
      answer: this.type.value === 'fib' ? this.question.value : this.answer.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),

      deck: this.deck.value,
      type: this.type.value ? this.type.value : 'basic',
      group: this.group.value
    };

    const copiedCard = await this.cs.addContentToFS(payload).toPromise();
    this.client.updateActiveContentById(copiedCard.id);
  }

  updateForm(event) {
    this.form.patchValue(event);
  }

  returnToForm(activeContent) {
    console.log('test');
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

  get category() {
    return this.form.get('category');
  }

  get previewMode() {
    return this.form.get('previewMode');
  }

}
