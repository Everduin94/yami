import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FibUtil } from './fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';
import { Subscription } from 'rxjs';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit, OnDestroy {


  form: FormGroup;
  showAddCategory = false;
  formSubscriptions: Subscription = new Subscription();

  readonly questionIcon = faQuestion;

  @ViewChild('title', { static: false }) titleElement;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService) { }


  ngOnInit() {


    
    this.form = this.fb.group({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      fillInBlankMode: new FormControl(false),
      previewMode: new FormControl(false),
    });


    this.client.activeContent$.pipe(take(1)).subscribe(v => {
      this.form.patchValue(v, {emitEvent: false})
    });

    
    const fillInBlankSub = this.fillInBlankMode.valueChanges.subscribe(v => {
      // Side Effects (Refactor) 
      v ? this.answer.disable() : this.answer.enable();
      if (v) this.answer.patchValue(this.question.value);
    });

    const questionSub = this.question.valueChanges.subscribe(v => {
      if (this.fillInBlankMode.value) this.answer.patchValue(v);
    });

    const categorySub = this.category.valueChanges.subscribe(v => {
      this.client.updateCategory(v);
    });

    const clientCategorySub = this.client.category$.subscribe(v => {
      this.category.patchValue(v, {emitEvent:false});
    })

    this.formSubscriptions.add(categorySub);
    this.formSubscriptions.add(clientCategorySub);
    this.formSubscriptions.add(questionSub);
    this.formSubscriptions.add(fillInBlankSub);
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }

  addCategory(inputValue: string, userId) {
    this.cs.addCategoryToFS(userId, { active: true, value: inputValue })
    this.form.patchValue({ category: inputValue })
  }


  onSubmit(userId) {
    const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.answer.value,
      category: this.category.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value)
    };

    this.cs.addContentToFS(userId, payload);
    const category = this.category.value;
    this.form.reset({category});
    this.client.updateActiveContent({});
  }

  addRow() {
    this.client.updateActiveContent({
      answer: '',
      question: '',
      title: '',
      category: ''
    });

    if (this.titleElement && this.titleElement.inputElement) { // TODO: Use Renderer / update to Question?
      this.titleElement.inputElement.nativeElement.focus();
    }
    
    const category = this.category.value;
    this.form.reset({category});
  }

  deleteRow(userId, selection) {
    this.cs.deleteContentFromFS(userId, selection.id);
    const category = this.category.value;
    this.form.reset({category});
    this.client.updateActiveContent({});
  }

  updateForm(event) {
    this.form.patchValue(event);
  }

  /* Getters */
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

  get fillInBlankMode() {
    return this.form.get('fillInBlankMode');
  }

  get previewMode() {
    return this.form.get('previewMode');
  }

}
