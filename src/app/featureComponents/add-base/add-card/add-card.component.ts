import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap, map } from 'rxjs/operators';
import { AddFlashCardsService } from 'src/app/services/add-flash-cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  form: FormGroup;
  showAddCategory = false;
  
  categories$ = this.auth.userId$.pipe(
    switchMap(userId => this.afs.getCategories(userId))
  );

  constructor(private fb: FormBuilder, private auth: FirebaseAuthService, private afs: AddFlashCardsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      question: '',
      answer: '',
      category: ''
    });
  }

  onSubmit(userId) {
      const payload = {
        title: this.title.value,
        question: JSON.stringify(this.question.value),
        answer: JSON.stringify(this.answer.value),
        category: this.category.value      
      };

      this.afs.postCard(userId, payload);
  }

  addCategory(inputValue: string, userId) {
    this.afs.postCategory(userId, {active: true, value: inputValue})
    this.form.patchValue({category: inputValue})
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
