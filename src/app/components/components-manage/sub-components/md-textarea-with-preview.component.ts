import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-md-textarea-with-preview',
  template: `
    <app-header-span [attr.dataCy]="controlName + '-header'" [label]="label"></app-header-span>

    <ng-container *ngIf="practicePreview; else textareaEl">
      <div [innerHtml]="value | mdToHtml:'answer':[]" [attr.data-cy]="'preview-' + controlName" class="scroll-div">
      </div>
    </ng-container>
  
    <ng-template #textareaEl>
      <app-md-textarea [form]="form" [placeholder]="placeholder" [controlName]="controlName" (keydown.enter)="$event.stopPropagation();">
      </app-md-textarea>
    </ng-template>
  `,
  styles: [],
  styleUrls: ['../../common-styles.css']
})
export class MdTextareaWithPreviewComponent {

  @Input() label;
  @Input() form;
  @Input() value;
  @Input() placeholder;
  @Input() controlName;
  @Input() practicePreview;
  @HostBinding('class') class = 'basic-header-block';

}
