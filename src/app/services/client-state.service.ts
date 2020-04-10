import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge, combineLatest } from 'rxjs';
import { startWith, scan, map, withLatestFrom, switchMap, shareReplay, filter, tap } from 'rxjs/operators';
import { FibUtil } from '../featureComponents/add-base/fib-util';
import { FirebaseAuthService } from './firebase-auth.service';
import { ContentStateService } from './content-state.service';

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

  reset$ = this.activeContent$.pipe();
  updateAnswersEvent = new Subject();
  answers$ = merge(this.updateAnswersEvent.asObservable(), this.reset$).pipe(
    scan((acc: any, part) => {
      if (part.fib) {
        return part.fib.reduce((acc, v, i) => {
          const key = 'fib-' + i;
          return {...acc, [key]: ""};
        }, {});
      } 
      else return ({...acc, ...part});
    }),
    withLatestFrom(this.activeContent$),
    map(([v, ac]) =>  FibUtil.compareAnswers(v, ac))
  );

  categoryChangeEvent = new BehaviorSubject('');
  category$ = this.categoryChangeEvent.asObservable();
  content$ = combineLatest([this.category$, this.auth.userId$]).pipe(
    filter(([category, userId]) => !!category),
    map(([category, userId]) => ({ category, userId })),
    switchMap(data => this.cs.getUsersContentFromFS(data.userId, ref => ref.where('category', '==', data.category))),
    map(v => v.map((b,i) => ({...b, index: i}))),
    shareReplay(1)
  );

  // TODO: Okay or refactor?
  activeContentByIndex = new Subject();
  activeContentByIndex$ = this.activeContentByIndex.pipe(
    withLatestFrom(this.content$),
    tap(([index, content]) => { 
      let activeContent = content.find(v => v.index === index);
      if (!activeContent) activeContent = content[0];
      this.updateActiveContent(activeContent); // Side Effect
    })
  )


  constructor(private auth: FirebaseAuthService, private cs: ContentStateService) { }

  public updateActiveContentByIndex(i) {
    this.activeContentByIndex.next(i);
  }

  public updateActiveContent(value) {
    this.activeContent.next(value);
  }

  public updateIsAnswerShowing(v) {
    this.isAnswerShowing.next(v);
  }

  public updateAnswers(obj) {
    this.updateAnswersEvent.next(obj);
  }

  public updateCategory(c) {
    this.categoryChangeEvent.next(c);
  }
}
