import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

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

  constructor() { }

  public updateActiveContent(value) {
    this.activeContent.next(value);
  }

  updateIsAnswerShowing(v) {
    this.isAnswerShowing.next(v);
  }
}
