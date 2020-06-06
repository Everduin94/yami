import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-answer-input',
  template: `
    <app-md-textarea-with-preview 
    controlName="answer"
    label="Answer"
    [form]="form"
    [value]="value"
    [practicePreview]="practicePreview"
    ></app-md-textarea-with-preview>
  `,
  styles: [`
    :host {
      grid-column: span 1 / -1;
      grid-row: span 2;
    }
  `],
  styleUrls: ['../../common-styles.css'],
})
export class AnswerInputComponent {

  @Input() form;
  @Input() type;
  @Input() value;
  @Input() practicePreview;
  @HostBinding('class') class = 'basic-block'
  @HostBinding('style.display') get expand() { return this.type === 'fib' ? 'none' : 'block' }

}
