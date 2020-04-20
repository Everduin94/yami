import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge, combineLatest, asyncScheduler, of } from 'rxjs';
import { startWith, scan, map, withLatestFrom, switchMap, shareReplay, filter, tap, observeOn } from 'rxjs/operators';
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

  reset$ = this.activeContent$;
  updateAnswersEvent = new Subject();
  answers$ = merge(this.updateAnswersEvent.asObservable(), this.reset$).pipe(
    observeOn(asyncScheduler), // emit in separate macrotask (for when reset emits ) (See notes at bottom)
    scan((acc: any, part) => {
      if (part.fib) {
        return part.fib.reduce((acc, v, i) => {
          const key = 'fib-' + i;
          return {...acc, [key]: ""};
        }, {});
      } 
      else return {...acc, ...part};
    }),
    withLatestFrom(this.activeContent$),
    map(([v, ac]) =>  FibUtil.compareAnswers(v, ac)),
  );

  categoryChangeEvent = new BehaviorSubject('');
  category$ = this.categoryChangeEvent.asObservable();
  content$ = combineLatest([this.category$, this.auth.userId$]).pipe(
    // filter(([category, userId]) => !!category),
    map(([category, userId]) => ({ category, userId })),
    switchMap(data => {
      if (!data.category) return of([]);
      return this.cs.getUsersContentFromFS(data.userId, ref => ref.where('category', '==', data.category))
    }),
    map(v => v.map((b,i) => ({...b, index: i}))),
    shareReplay(1)
  );

  // TODO: Okay or refactor?
  activeContentByIndex = new Subject;
  activeContentByIndex$ = this.activeContentByIndex.pipe(
    withLatestFrom(this.content$),
    tap(([index, content]) => { 
      let activeContent = content.find(v => v.index === index);
      if (!activeContent) activeContent = content[0];
      this.updateActiveContent(activeContent); // Side Effect
    })
  )


  constructor(private auth: FirebaseAuthService, private cs: ContentStateService) {
   }

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


/**
 * answers$ is being scheduled as macrotasks because I get an expression changed exception
 * whenever I emit an event from filter list "contentLoadedEvent"
 * 
 * contentLoadedEvent delegates to the parent to call updateActiveContentByIndex(0)
 * 
 * updateActiveContentByIndex updates activeContent (obviously), which answers$ is listening to.
 * 
 * The goal of answers listening to activeContent$ is so I won't have stale answers from the last card
 * 
 * The exception says " was [Object object] now 'incorrect' " or " was [Object object] now '' "
 * 
 * I don't understand when answers$ was or is ever an object. It should always be an array.
 * - When I display the value in the DOM, it is always an array
 * 
 * I also don't understand why this causes an exception in the first place.
 * - I am delegating the original event up to a parent
 * - I am using async pipe / streams of data
 * - The container is not being recreated, it's just emitting new values
 *   - The ng-container is always truthy once emitting
 * 
 * Is this because I next a value at the end of an emission of a source observable?
 * - Is the solution (not asyncScheduler) to compose observables in a different way and avoid side-effects?
 * - Another thing I could try is removing withLatestFrom and using CombineLastest in answers$ so I'm 
 * not reaching back into activeContent potentially before/after the change
 */