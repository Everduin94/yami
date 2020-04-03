import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { startWith, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientStateService {

  private activeContent: BehaviorSubject<any> = new BehaviorSubject<any>({
    title: '',
    question: '',
    answer: '',
    category: ''
  });
  public activeContent$: Observable<any> = this.activeContent.asObservable();

  isAnswerShowing = new Subject();
  public isAnswerShowing$ = this.isAnswerShowing.asObservable().pipe(
    startWith("hide")
  );

  updateAnswersEvent = new Subject();
  answers$ = merge(this.updateAnswersEvent.asObservable(), this.activeContent$).pipe(
    tap(v => console.log(v)),
    map(v => v.question ? {} : v),
  )

  refreshState() {
    // run the preprocessor on the question
    // setup a new object
  }

  updateState() {
    // add key
  }

  constructor() { }

  public updateActiveContent(value) {
    this.activeContent.next(value);
  }

  public updateIsAnswerShowing(v) {
    this.isAnswerShowing.next(v);
  }

  public updateAnswers(key, value) {
    this.updateAnswersEvent.next({key: value});
  }
}
