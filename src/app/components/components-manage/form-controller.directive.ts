import { Directive, Input } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appFormController]'
})
export class FormControllerDirective {

  @Input() activeContent;
  @Input('appFormController') form;
  @Input() formSubmittedEvent: Observable<any>;

  readonly deckRef$ = this.cs.deckRef$;
  readonly groupRef$ = this.cs.groupRef$;

  constructor(private cs: ContentStateService) { }

  returnToForm() {
    this.form.get('deck').patchValue(this.activeContent.deck);
    this.form.get('group').patchValue(this.activeContent.group);
  }

}
