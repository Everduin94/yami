import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit {

  activeContent;
  activeAnswer;
  form: FormGroup;

  constructor(private fb: FormBuilder, public auth: FirebaseAuthService,) { }

  ngOnInit() {
    this.form = this.fb.group({});
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

}
