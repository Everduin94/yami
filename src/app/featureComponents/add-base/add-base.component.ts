import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FibUtil } from './fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit {

  form: FormGroup;
  showAddCategory = false;

  @ViewChild('title', { static: false }) titleElement;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });

    this.form.valueChanges.subscribe(console.log);
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
    this.client.updateActiveContent({}); // TODO: was null before
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
    console.log('add row');
  }

  deleteRow(userId, selection) {
    console.log('delete: ', selection);
    this.cs.deleteContentFromFS(userId, selection.id);
    this.form.reset();
    this.client.updateActiveContent({}); // TODO: This was null too
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

}
