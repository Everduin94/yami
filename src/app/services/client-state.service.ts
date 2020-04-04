import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge, combineLatest } from 'rxjs';
import { startWith, mapTo, scan, map, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientStateService {

  private activeContent: BehaviorSubject<any> = new BehaviorSubject<any>({
    title: '',
    question: '',
    answer: '',
    category: '',
    fib: [],
  });
  public activeContent$: Observable<any> = this.activeContent.asObservable();

  isAnswerShowing = new Subject();
  public isAnswerShowing$ = this.isAnswerShowing.asObservable().pipe(
    startWith("hide")
  ); // StartWith instead of BehaviorSubject so we always start subscription with hide.


  // TODO:
  /**
   * if (question) parse and get all fibs
   */
  reset$ = this.activeContent$.pipe();
  updateAnswersEvent = new Subject();
  answers$ = merge(this.updateAnswersEvent.asObservable(), this.reset$).pipe(
    scan((acc: any, part) => {
      if (part.fib) {
        return part.fib.reduce((acc,v, i) => {
          const key = 'fib-' + i;
          return {...acc, [key]: ""};
        }, {});
      } 
      else return ({...acc, ...part});
    }),
    withLatestFrom(this.activeContent$),
    map(([v, ac]) => {
      return ac.fib.map((fib, i) => {
        const given = v['fib-'+i];
        const actual = fib;
        if (given === actual) return "correct"
        else return "incorrect"
      })
    })
  ) // Emits reset first (mapTo), emit empty object on reset, merge state on event.

    // TODO: handle no answers

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
