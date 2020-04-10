import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ClientStateService } from 'src/app/services/client-state.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appNextListener]'
})
export class NextListenerDirective implements OnDestroy, OnInit {
  
  @Input('appNextListener') activeContent;

  @HostListener('window:keydown.control.shift.enter', ['$event'])
  doImportantThings(e) {
    e.stopPropagation();
    e.preventDefault();
    this.clientState.updateIsAnswerShowing('hide');
    this.clientState.updateActiveContentByIndex(this.activeContent.index + 1);
  }

  subscription: Subscription;

  constructor(private clientState: ClientStateService) {
    
  }

  ngOnInit(): void {
    this.subscription = this.clientState.activeContentByIndex$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
