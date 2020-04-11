import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FibUtil } from './fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit, OnDestroy {


  form: FormGroup;
  showAddCategory = false;
  formSubscriptions: Subscription = new Subscription();

  @ViewChild('title', { static: false }) titleElement;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      fillInBlankMode: new FormControl(false),
    });

    
    const fillInBlankSub = this.fillInBlankMode.valueChanges.subscribe(v => {
      // Side Effects (Refactor) 
      v ? this.answer.disable() : this.answer.enable();
      if (v) this.answer.patchValue(this.question.value);
    });
    const questionSub = this.question.valueChanges.subscribe(v => {
      if (this.fillInBlankMode.value) this.answer.patchValue(v);
    });

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
    this.client.updateActiveContent({});
    this.form.reset();
  }

  addRow() {
    this.client.updateActiveContent({
      answer: '',
      question: '',
      title: '',
      category: ''
    });

    if (this.titleElement && this.titleElement.inputElement) { // TODO: Use Renderer
      this.titleElement.inputElement.nativeElement.focus();
    }

    this.form.reset();
  }

  deleteRow(userId, selection) {
    this.cs.deleteContentFromFS(userId, selection.id);
    this.form.reset();
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

}
