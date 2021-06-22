import { Directive, HostListener, Input } from '@angular/core';
import { FormControllerDirective } from './form-controller.directive';

@Directive({
  selector: '[appSaveListener]'
})
export class SaveListenerDirective {

  @Input('appSaveListener') activeCard;
  @Input() disableSave;

  constructor(public fc: FormControllerDirective) {
    
  }

  @HostListener('window:keydown.control.s', ['$event'])
  save($event: any) {
    $event.preventDefault();
    if (this.disableSave) console.log('Disabled: blocking save')  
    else this.fc.onSubmit(this.activeCard);
  }


}
