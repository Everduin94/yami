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

  readonly textAreaPlaceholder = `# Heading\n## Sub Heading\n### ...\nList\n- One\n- Two\nFIB Fill in blank FIB\n**Bold**\n*Italics*\n--- (line)`
  
  form: FormGroup;
  showAddCategory = false;
  formSubscriptions: Subscription = new Subscription();

  readonly questionIcon = faQuestion;

  @ViewChild('title', { static: false }) titleElement;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService) { }


  test() {
    console.log('hi')
  }

  ngOnInit() {

    this.form = this.fb.group({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      group: new FormControl('default'),
      // type: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl(''),
      isFibMode: new FormControl(false),
      previewMode: new FormControl(false),
      
    });


    const activeContentSub = this.client.activeContent$.subscribe(v => {
      this.form.patchValue(v, {emitEvent: false})
    });

    
    const fillInBlankSub = this.isFibMode.valueChanges.subscribe(v => {
      // Side Effects (Refactor) 
      v ? this.answer.disable() : this.answer.enable();
      if (v) this.answer.patchValue(this.question.value);
    });

    const questionSub = this.question.valueChanges.subscribe(v => {
      if (this.isFibMode.value) this.answer.patchValue(v);
    });

    const categorySub = this.category.valueChanges.subscribe(v => {
      this.client.updateCategory(v);
    });

    const clientCategorySub = this.client.category$.subscribe(v => {
      this.category.patchValue(v, {emitEvent:false});
    })

    const contentByIdSub = this.client.activeContentById$.subscribe();

    this.formSubscriptions.add(activeContentSub);
    this.formSubscriptions.add(categorySub);
    this.formSubscriptions.add(clientCategorySub);
    this.formSubscriptions.add(questionSub);
    this.formSubscriptions.add(fillInBlankSub);
    this.formSubscriptions.add(contentByIdSub);
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }

  addCategory(inputValue: string, userId) {
    this.cs.addCategoryToFS(userId, { active: true, value: inputValue })
    this.form.patchValue({ category: inputValue })
  }


  onSubmit(userId, activeContent) {
    const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.isFibMode.value ? this.question.value : this.answer.value,
      category: this.category.value,
      // type: this.type.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),
      isFibMode: this.isFibMode.value,
      group: this.group.value ? this.group.value : 'default'
    };

    if (activeContent && activeContent.id) {
      this.cs.updateContentOnFS(userId, activeContent.id, payload);
    } else {
      this.cs.addContentToFS(userId, payload);
    }

    const category = this.category.value;
    this.form.reset({category});
    this.client.updateActiveContent({});
  }

  addRow() {
    this.client.updateActiveContent({
      answer: '',
      question: '',
      title: '',
      category: this.category.value,
      isFibMode: false
    });

    if (this.titleElement && this.titleElement.inputElement) { // TODO: Use Renderer / update to Question?
      this.titleElement.inputElement.nativeElement.focus();
    }
    
    const category = this.category.value;
    this.form.reset({category});
  }

  cancel(selection) {
    this.form.reset(selection);
  }

  deleteRow(userId, selection) {

    if (window.confirm('Are you sure you want to delete this card?')) {
      this.cs.deleteContentFromFS(userId, selection.id);
      const category = this.category.value;
      this.form.reset({category});
      this.client.updateActiveContent({});
    }
    
  }

  async copyRow(userId, activeContent) {
    const title = this.title.value + ' (copy)';
    console.log(title);
    const payload = {
      title: title,
      question: this.question.value,
      answer: this.isFibMode.value ? this.question.value : this.answer.value,
      category: this.category.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),
      isFibMode: this.isFibMode.value
    };

    const copiedCard = await this.cs.addContentToFS(userId, payload);
    this.client.updateActiveContentById(copiedCard.id);
  }

  updateForm(event) {
    this.form.patchValue(event);
  }

  /* Getters */
  get title() {
    return this.form.get('title');
  }

  get group() {
    return this.form.get('group');
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

  get isFibMode() {
    return this.form.get('isFibMode');
  }

  get previewMode() {
    return this.form.get('previewMode');
  }

}
