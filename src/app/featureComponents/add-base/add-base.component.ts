import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap } from 'rxjs/operators';
import { AddFlashCardsService } from 'src/app/services/add-flash-cards.service';

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit {

  activeContent;
  activeAnswer;
  form: FormGroup;
  showAddCategory = false;

  @ViewChild('title', {static: false}) titleElement;

  categories$ = this.auth.userId$.pipe(
    switchMap(userId => this.afs.getCategories(userId))
  );

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, private afs: AddFlashCardsService) { }

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
    this.afs.postCategory(userId, { active: true, value: inputValue })
    this.form.patchValue({ category: inputValue })
  }


  onSubmit(userId) {
    const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.answer.value, 
      category: this.category.value
    };

    this.afs.postCard(userId, payload);
    this.activeContent = null;
    this.form.reset();
  }

  addRow() {

    this.activeContent = {
      answer: '',
      question: '',
      title: '',
      category: ''
    }

    if (this.titleElement && this.titleElement.inputElement) { // TODO: Use Renderer
      this.titleElement.inputElement.nativeElement.focus();      
    }

    this.form.reset();
    console.log('add row');
  }

  deleteRow(userId, selection) {
    console.log('delete: ', selection);
    this.afs.deleteContent(userId, selection.id);
    this.form.reset();
    this.activeContent = null;
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
