import { Component, OnInit } from '@angular/core';
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

  categories$ = this.auth.userId$.pipe(
    switchMap(userId => this.afs.getCategories(userId))
  );

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService, private afs: AddFlashCardsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: new FormControl('DEMO', [Validators.required]),
      title: new FormControl('Hello!', [Validators.required])
    });

    this.form.valueChanges.subscribe(console.log);
  }

  addCategory(inputValue: string, userId) {
    this.afs.postCategory(userId, {active: true, value: inputValue})
    this.form.patchValue({category: inputValue})
  }


  onSubmit(userId) {
    /*const payload = {
      title: this.title.value,
      question: this.question.value,
      answer: this.answer.value,
      category: this.category.value      
    };*/

    /*this.afs.postCard(userId, payload);*/
}

addRow() {
  console.log('add row')
}

deleteRow(selection) {
  console.log('delete: ', selection);
}

}
