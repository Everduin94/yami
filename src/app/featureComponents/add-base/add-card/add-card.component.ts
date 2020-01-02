import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { AddFlashCardsService } from 'src/app/services/add-flash-cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  form: FormGroup;
  
  categories$;

  constructor(private fb: FormBuilder, private auth: FirebaseAuthService, private afs: AddFlashCardsService) { }

  ngOnInit() {
    this.categories$ = this.auth.userId$.pipe(
      switchMap(userId => this.afs.getCategories(userId))
    )


    this.form = this.fb.group({
      question: '',
      answer: '',
      category: ''
    });

    this.form.valueChanges.subscribe(console.log);
  }

  onSubmit() {
      const payload = {
        question: JSON.stringify(this.question.value),
        answer: JSON.stringify(this.answer.value),
        category: this.category.value      
      };

      console.log('hey this is payload speaking: ', payload)
  }

  async addCategory(ev: Event) {
    console.log('this is is add category')
    this.auth.userId$.pipe(
      tap(val => console.log(val)),
      map(userId => this.afs.postCategory(userId, {active: true, value: 'TEST!'}))
    ).subscribe();
    
    ev.preventDefault();
    
  }


  /* Getters */
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
