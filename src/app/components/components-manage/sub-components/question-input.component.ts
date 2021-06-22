import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormControllerDirective } from '../form-controller.directive';

@Component({
  selector: 'app-question-input',
  template: `
    <app-md-textarea-with-preview 
    controlName="question"
    label="Question"
    [form]="form"
    [value]="value"
    [practicePreview]="practicePreview"
    [placeholder]="fc.textAreaPlaceholder"
    ></app-md-textarea-with-preview>
  `,
  styles: [`
    :host {
      grid-column: span 1 / -1;
      grid-row: span 2;
    }
  `],
  styleUrls: ['../../common-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionInputComponent {

  @Input() form;
  @Input() type;
  @Input() value;
  @Input() practicePreview;
  @HostBinding('class') class = 'basic-block'
  @HostBinding('class.expand') get expand() { return this.type === 'fib' }

  constructor(public fc: FormControllerDirective) {

  }

}
