import { Directive, HostListener, Input } from '@angular/core';
import { ClientStateService } from 'src/app/services/client-state.service';

@Directive({
  selector: '[appNextListener]'
})
export class NextListenerDirective {
  
  @Input('appNextListener') flashcardEntity;

  @HostListener('window:keydown.control.shift.enter', ['$event'])
  doImportantThings(e) {
    e.stopPropagation();
    e.preventDefault();
    this.clientState.updateIsAnswerShowing('hide');
    this.clientState.setActiveFlashcard({index: this.flashcardEntity.activeIndex + 1});
  }

  constructor(private clientState: ClientStateService) {
    
  }

}
