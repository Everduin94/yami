import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { startWith, tap, map, mapTo, scan } from 'rxjs/operators';

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
  ); // StartWith instead of BehaviorSubject so we always start subscription with hide.

  reset$ = this.activeContent$.pipe(mapTo({}));
  updateAnswersEvent = new Subject();
  answers$ = merge(this.updateAnswersEvent.asObservable(), this.reset$).pipe(
    scan((acc: any, part) => {
      if (Object.keys(part).length === 0) return part;
      else return ({...acc, ...part});
    }),
  ) // Emits reset first (mapTo), emit empty object on reset, merge state on event.

  constructor() { }

  public updateActiveContent(value) {
    this.activeContent.next(value);
  }

  public updateIsAnswerShowing(v) {
    this.isAnswerShowing.next(v);
  }

  public updateAnswers(obj) {
    this.updateAnswersEvent.next(obj);
  }
}
