import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-md-textarea-with-preview',
  template: `
    <app-header-span style="display: grid" [attr.dataCy]="controlName + '-header'" [label]="label">
      <app-preview style="grid-column: 2; margin-right: 20px; justify-self: end;" 
      (onChange)="practicePreview = $event"></app-preview>
    </app-header-span>

    <ng-container *ngIf="practicePreview; else textareaEl">
      <div [innerHtml]="value | mdToHtml:'answer':[]" [attr.data-cy]="'preview-' + controlName" class="scroll-div">
      </div>
    </ng-container>
  
    <ng-template #textareaEl>
      <app-md-textarea [form]="form" [placeholder]="placeholder" [controlName]="controlName" (keydown.enter)="$event.stopPropagation();">
      </app-md-textarea>
    </ng-template>
  `,
  styles: [`
      @media (max-width: 768px) { 
    
      :host {
        min-height: 400px;
      }

      }
  `],
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
