import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddFlashCardsService } from 'src/app/services/add-flash-cards.service';
import { Subject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Output() clickedEvent = new EventEmitter();

  form: FormGroup;
  
  /**
   * Input: UserID & Category String
   * Output: List of cards by category
   * 
   * Rules: Only query if a category is selected
    * should return all DEMO cards given 'DEMO' category
    * should reutrn all cards given 'ALL' category
    * should return no cards given not authorized
    * should return only authorized cards given authorized
   * 
   */
  categoryChangeEvent = new Subject();
  categoryChangeEvent$ = this.categoryChangeEvent.asObservable();
  cards$ = combineLatest([this.categoryChangeEvent$, this.auth.userId$]).pipe(
    map(([category, userId]) => ({category, userId})),
    switchMap(data => this.fs.getUsersCards(data.userId, ref => ref.where('category', '==', data.category))),
  );

  categories$ = this.auth.userId$.pipe(
    switchMap(userId => this.afs.getCategories(userId))
  );

  constructor(private fs: FlashCardsService, private auth: FirebaseAuthService, private afs: AddFlashCardsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: ''
    });
  
    this.form.get('category').valueChanges.pipe(
      tap(val => {
        this.categoryChangeEvent.next(val);
        console.log(val);
      })
    ).subscribe(); // TODO: Handle sub
  }

  raiseClickedEvent(content) {
    this.clickedEvent.emit(content);
  }
}
