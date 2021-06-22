import { Directive, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { debounce } from "cypress/types/lodash";
import { ReplaySubject, Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ClientStateService } from "src/app/services/client-state.service";

@Directive({
  selector: "[appScrollSync]",
})
export class ScrollSyncDirective {

  private dispatcher = new ReplaySubject<number>(1);
  public scrollPosition$: Observable<number> = this.dispatcher.pipe(
    debounceTime(100),
  );
  public dispatch = (scrollPosition: number) => this.dispatcher.next(scrollPosition);

  constructor(private clientState: ClientStateService) {}
  
}
