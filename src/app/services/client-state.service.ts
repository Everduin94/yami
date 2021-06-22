import { Injectable } from "@angular/core";
import {
  Subject,
  BehaviorSubject,
  Observable,
  merge,
  asyncScheduler,
  of,
  ReplaySubject,
  combineLatest,
} from "rxjs";
import {
  startWith,
  scan,
  map,
  switchMap,
  shareReplay,
  observeOn,
  take,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { FibUtil } from "../components/components-manage/fib-util";
import { ContentStateService } from "./content-state.service";

export interface FlashCardEntity {
  entities: [];
  activeCard: {};
  activeIndex: number;
}

export interface ActiveUpdate {
  flashcard: {};
  index: number;
  id: string;
  fn: (flashCards) => {};
}

@Injectable({
  providedIn: "root",
})
export class ClientStateService {
  isAnswerShowing = new Subject();
  public isAnswerShowing$ = this.isAnswerShowing
    .asObservable()
    .pipe(startWith("hide")); // StartWith instead of BehaviorSubject so we always start subscription with hide.

  deckChangeEvent = new BehaviorSubject("");
  deck$ = this.deckChangeEvent.asObservable();

  activateFlashcardEvent = new BehaviorSubject<Partial<ActiveUpdate>>({});
  activateFlashcard$: Observable<Partial<ActiveUpdate>> = this.activateFlashcardEvent.pipe();
  setActiveFlashcard = (value: Partial<ActiveUpdate>) =>
    this.activateFlashcardEvent.next(value);

  flashCards$ = this.deck$.pipe(
    switchMap((deck) => (deck ? this.cs.fsSelectAllFlashcards(deck) : of([]))),
    shareReplay(1),
    switchMap((flashCards) =>
      this.activateFlashcard$.pipe(
        map((v) => {
          let activeCard = {};
          if (v.flashcard) activeCard = v.flashcard;
          else if (!flashCards.length) activeCard = {};
          else if (v.index != null) activeCard = flashCards[v.index];
          else if (v.id) activeCard = flashCards.find((f) => f.id === v.id);
          else if (v.fn) activeCard = v.fn(flashCards);
          return {
            entities: flashCards,
            activeCard,
            activeIndex: flashCards.findIndex((f) => f === activeCard),
          };
        })
      )
    ),
    shareReplay(1)
  );

  /**
   * Ideas:
   * - We shouldn't worry about subbing to an observable twice.
   *   - To make this possible, you need to have data observables and side effect observables
   * - We should know if something is nullable or not nullable so we don't have to do checks like crazy
   * - We should have the ability to use the ? operator but something is wrong
   * - We should type our observables more consistently
   */

  updateAnswersEvent = new Subject();
  activeCard$ = this.flashCards$.pipe(
    map((v) => v.activeCard)
  );
  answers$ = merge(
    this.activeCard$,
    this.updateAnswersEvent.asObservable()
  ).pipe(
    observeOn(asyncScheduler), // emit in separate macrotask (for when reset emits )
    scan((acc: any, part) => {
      if (part && part.fib) {
        return part.fib.reduce((acc, v, i) => {
          const key = "fib-" + i;
          return { ...acc, [key]: "" };
        }, {});
      }

      return part ? { ...acc, ...part } : acc;
    }),
    switchMap((localAnswers) =>
      this.activeCard$.pipe(
        take(1),
        map((dbAnswers) => FibUtil.compareAnswers(localAnswers, dbAnswers))
      )
    )
  );

  private navigation = new BehaviorSubject("details");
  public navigation$ = this.navigation.pipe();

  public isEditingCard$: Observable<boolean> = combineLatest([this.navigation$, this.activateFlashcard$]).pipe(
    map(([path, activeCard]) => {
      if (path === 'edit' && !!activeCard.id || activeCard.index != null) return true;
      else if (path === 'details') return true;
      else return false;
    })
  );

  constructor(private cs: ContentStateService) {
    this.isEditingCard$.subscribe();
  }

  public updateNavigation = (panel) => this.navigation.next(panel);
  public updateIsAnswerShowing = (v) => this.isAnswerShowing.next(v);
  public updateAnswers = (obj) => this.updateAnswersEvent.next(obj);
  public updateCategory = (c) => this.deckChangeEvent.next(c);
}
