import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, combineLatest, Subscription, Observable } from 'rxjs';
import { ContentStateService } from 'src/app/services/content-state.service';
import { ClientStateService } from 'src/app/services/client-state.service';

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

  constructor(
    private auth: FirebaseAuthService,
    public cs: ContentStateService,
    private fb: FormBuilder,
    private client: ClientStateService) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: ''
    });

    this.cards$ = combineLatest([this.form.get('category').valueChanges, this.auth.userId$]).pipe(
      map(([category, userId]) => ({ category, userId })),
      switchMap(data => this.cs.getUsersContentFromFS(data.userId, ref => ref.where('category', '==', data.category))),
    );
  }

  raiseClickedEvent(content) {
    // TODO: Add DB call up higher, this is still needed for patch form
    this.clickedEvent.emit(content);
    this.client.updateActiveContent(content);
  }
}
