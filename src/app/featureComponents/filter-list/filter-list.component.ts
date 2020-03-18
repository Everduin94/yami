import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddFlashCardsService } from 'src/app/services/add-flash-cards.service';
import { Subject, combineLatest, Subscription, Observable } from 'rxjs';
import { ContentStateService } from 'src/app/services/content-state.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input() activeContent;
  @Output() clickedEvent = new EventEmitter();

  form: FormGroup;
  formSub: Subscription;
  
  /**
   * Input: UserID & Category String
   * Output: List of cards by category
   * 
   * Rules: Only query if a category is selected
    * should return all DEMO cards given 'DEMO' category
    * should return all cards given 'ALL' category
    * should return no cards given not authorized
    * should return only authorized cards given authorized
   * 
   */
  categoryChangeEvent = new Subject();
  categoryChangeEvent$ = this.categoryChangeEvent.asObservable();
  cards$: Observable<any>;

  constructor(private fs: FlashCardsService,
     private auth: FirebaseAuthService,
      private afs: AddFlashCardsService,
      public cs: ContentStateService,
       private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: ''
    });
  
    this.cards$ = combineLatest([this.form.get('category').valueChanges, this.auth.userId$]).pipe(
      map(([category, userId]) => ({category, userId})),
      switchMap(data => this.fs.getUsersCards(data.userId, ref => ref.where('category', '==', data.category))),
    );
  }

  raiseClickedEvent(content) {
    // TODO: Add DB call up higher, this is still needed for patch form
    this.clickedEvent.emit(content);
    this.cs.updateActiveContent(content);
  }
}
