import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FibUtil } from './fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';
import { Subscription } from 'rxjs';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';

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

  ngOnInit() {

    this.form = this.fb.group({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      
      
      question: new FormControl('', [Validators.required]),
      answer: new FormControl(''),
      previewMode: new FormControl(false),

      group: new FormControl('default'),
      deck: new FormControl(''),
      type: new FormControl('basic', [Validators.required]),
      
    });

    const activeContentSub = this.client.activeContent$.subscribe(v => {
      this.form.patchValue(v, {emitEvent: false})
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
    this.formSubscriptions.add(contentByIdSub);
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }

  addCategory(inputValue: string, userId) {
    this.cs.addCategoryToFS(userId, { active: true, value: inputValue })
    this.form.patchValue({ category: inputValue })
    this.form.patchValue({ deck: inputValue })
  }


  addGroup(inputValue:string, userId) {
    this.cs.addGroupToFS(userId, {active: true, value: inputValue});
  }


  onSubmit(userId, activeContent) {
    const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.type.value === 'fib' ? this.question.value : this.answer.value,
      category: this.category.value,
      type: this.type.value,
      deck: this.category.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),
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

      type: 'basic',
      deck: this.category.value,
      group: this.group.value
    });

    if (this.titleElement && this.titleElement.inputElement) { // TODO: Use Renderer / update to Question?
      this.titleElement.inputElement.nativeElement.focus();
    }
    
    const category = this.category.value;
    const group = this.category.value;
    this.form.reset({category, group});
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
      answer: this.type.value === 'fib' ? this.question.value : this.answer.value,
      category: this.category.value,
      fib: FibUtil.getPredefinedAnswers(this.question.value),

      deck: this.deck.value,
      type: this.type.value,
      group: this.group.value ? this.group.value : 'default'
    };

    const copiedCard = await this.cs.addContentToFS(userId, payload);
    this.client.updateActiveContentById(copiedCard.id);
  }

  updateForm(event) {
    this.form.patchValue(event);
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
