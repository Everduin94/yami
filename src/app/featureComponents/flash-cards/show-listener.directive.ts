import { Directive, HostListener, Input } from '@angular/core';
import { ClientStateService } from 'src/app/services/client-state.service';

@Directive({
  selector: '[appShowListener]'
})
export class ShowListenerDirective {

  @Input('appShowListener') isAnswerShowing;

  constructor(public client: ClientStateService) {
    
  }

  @HostListener('window:keydown.control.enter')
  showAnswer() {
    console.log('hey?');
    this.updateAnswer(this.toggleAnswer(this.isAnswerShowing))
  }

  // TODO: Refactor
  toggleAnswer = (v) => v === 'show' ? 'hide' : 'show';
  updateAnswer = (v) => this.client.updateIsAnswerShowing(v);

}
