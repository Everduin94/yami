import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-question-input',
  template: `
    <app-md-textarea-with-preview 
    controlName="question"
    label="Question *"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionInputComponent {

  @Input() form;
  @Input() type;
  @Input() value;
  @Input() practicePreview;
  @HostBinding('class') class = 'basic-block'
  @HostBinding('class.expand') get expand() { return this.type === 'fib' }

}
