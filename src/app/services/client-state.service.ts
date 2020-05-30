import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge, combineLatest, asyncScheduler, of } from 'rxjs';
import { startWith, scan, map, withLatestFrom, switchMap, shareReplay, filter, tap, observeOn } from 'rxjs/operators';
import { FibUtil } from '../featureComponents/add-base/fib-util';
import { FirebaseAuthService } from './firebase-auth.service';
import { ContentStateService } from './content-state.service';


export interface FlashCardEntity {
  entities: [];
  activeCard: {};
  activeIndex: number;
}

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
    isFibMode: false, // TODO: Remove

    deck: '',
    group: '',
    type: 'basic',
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
      if (part && part.fib) {
        return part.fib.reduce((acc, v, i) => {
          const key = 'fib-' + i;
          return {...acc, [key]: ""};
        }, {});
      }

      return part ? {...acc, ...part} : acc;
    }),
    withLatestFrom(this.activeContent$), // TODO: This seems weird, and compareAnswers says (from DB)
    map(([v, ac]) =>  FibUtil.compareAnswers(v, ac)),
  );

  deckChangeEvent = new BehaviorSubject('');
  deck$ = this.deckChangeEvent.asObservable();
  flashCards$ = this.deck$.pipe(
    switchMap(deck => deck ? this.cs.fsSelectAllFlashcards(deck) : of([])),
    map(v => v.map((b,i) => ({...b, index: i}))),
    shareReplay(1)
  );

  // TODO: Okay or refactor? -- Yes refactor both (05/07/2020)
  activeContentByIndex = new Subject<number>();
  activeContentByIndex$ = this.activeContentByIndex.pipe(
    withLatestFrom(this.flashCards$),
    tap(([index, content]) => {
      if (!content.length) return;
      let activeContent = content[index] ? content[index] : content[0];
      this.updateActiveContent(activeContent); // Side Effect
    })
  )

  activeContentById = new Subject();
  activeContentById$  = this.activeContentById.asObservable().pipe(
    withLatestFrom(this.flashCards$),
    tap(([id, content]) => {
      if (!content.length) return;
      let activeContent = content.find(v => v.id === id);
      if (!activeContent) return;
      this.updateActiveContent(activeContent); // Side Effect
    })
  );

  myTest = new BehaviorSubject<Partial<{index: number, id: string, fn: (flashCards) => {}}>>({});
  setActiveFlashcard(value: Partial<{index: number, id: string, fn: (flashCards) => {}}>) {
      this.myTest.next(value);
  }

   // TODO: Try something like this
   flashCards2$ = this.deck$.pipe(
    tap(v => console.log('deck changed')),
    switchMap(deck => deck ? this.cs.fsSelectAllFlashcards(deck) : of([])),
    tap(v => console.log('flash cards changed', v)),
    shareReplay(1),
    switchMap(flashCards => this.myTest.asObservable().pipe(
      map(v => {
        let activeCard = {};
        if (!flashCards.length) activeCard = {}
        else if (v.index) activeCard = flashCards[v.index];
        else if (v.id) activeCard = flashCards.find(f => f.id === v.id);
        else if (v.fn) activeCard = v.fn(flashCards);
        return {entities: flashCards, activeCard, activeIndex: flashCards.findIndex(f => f === activeCard)};
      })
    )),
    tap(v => console.log('logging flash cards 2', v))
  ).subscribe(v => console.log(v));



  test = new Subject();
  test$ = this.test.asObservable().pipe(
    switchMap((fn: (fc) => boolean) => this.flashCards$.pipe(
      map(flashcards => fn ? flashcards.find(fc => fn(fc)) : null)
    )),
    map(fc => fc ? fc : {}), // TODO: Missing side effect for set by index (could try to pipe onto usage)
    shareReplay(1)
  );

  setActiveContent(fn: (fc) => boolean) {
    this.test.next(fn);
  }
  // End test

  constructor(private auth: FirebaseAuthService, private cs: ContentStateService) {
   }

  public updateActiveContentByIndex(i) {
    this.activeContentByIndex.next(i);
  }

  public updateActiveContentById(i) {
    this.activeContentById.next(i);
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
    this.deckChangeEvent.next(c);
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