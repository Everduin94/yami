import { Component, Input } from '@angular/core';
import { FormControllerDirective } from '../form-controller.directive';

@Component({
  selector: 'app-manage-container',
  template: `
    <form style="display:contents" [formGroup]="fc.form" (ngSubmit)="fc.onSubmit(flashCardsEntity.activeCard)" autocomplete="off">
        <app-actions-drawer 
        [flashCardsEntity]="flashCardsEntity"
        [deck]="fc.selectedDeck$ | async"
        [aggregatedDecks]="fc.aggregatedDecks$ | async"
        (actionEvent)="fc.consumeActionEvent($event)">
        </app-actions-drawer>

        <app-question-input 
        [form]="fc.form"
        [type]="fc.type?.value"
        [value]="fc.question?.value"
        [practicePreview]="fc.previewMode?.value">
        </app-question-input>

        <app-answer-input 
        [form]="fc.form"
        [type]="fc.type?.value"
        [value]="fc.answer?.value"
        [practicePreview]="fc.previewMode?.value">
        </app-answer-input>

        <!-- Meta Data & Save -->
        <div class="container__details">
          <app-header-span dataCy="meta-header" label="Details">
            <span data-cy="details-header-info"> -
              {{flashCardsEntity?.activeCard?.title ? flashCardsEntity?.activeCard?.title : 'Adding New Card'}}</span>
          </app-header-span>

          <app-flash-card-details>
          </app-flash-card-details>
          
          <div style="padding: 5px;">
            <div style="padding-top: 10px; font-size: 24px; grid-column: span 2; text-align: center;">
              <mat-checkbox formControlName="previewMode" data-cy="preview-mode">Practice Preview</mat-checkbox>
              <hr class="divider">
            </div>

            <div class="save-cancel">
              <button class="hover-button--cancel" (click)="fc.cancel(flashCardsEntity?.activeCard); $event.preventDefault();"
                mat-raised-button data-cy="cancel-content-button">
                Cancel
              </button> 
              <button mat-raised-button [disabled]="!fc.form.valid" color="primary" data-cy="submit-content-button"
                class="submit-content-button">
                Save
              </button>
            </div>
          </div>
        </div>
    </form>
  `,
  styles: [`
    
    :host {
        display: grid;
        grid-template-columns: 2fr minmax(255px, 2fr) 6fr;
        grid-template-rows: minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        height: 100%;
        width: 100%;
    }

    .container__details {
        display: grid;
        grid-column: span 1 / -2;
        grid-row: 1 / span 4;
        grid-template-rows:  min-content minmax(0,1fr) min-content;
        border: 1px solid var(--box-shadow);
    }

    .divider {
        border-color: var(--box-color);
    }

    .expand {
        grid-row: span 4;
    }

    .padded-container--bottom-shadow {
        box-shadow:  0 4px 3px -3px var(--box-shadow);
    }

    .save-cancel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      margin-bottom: 10px;
    }

    .add-button {
        box-shadow: -6px 6px 1px var(--primary-color);
    }

    .save-category-control, .back-category-control {
       grid-column: span 1;
    }

    app-filter-list {
        border-bottom: var(--box-shadow) 1px solid;
    }                    
  `],
  styleUrls: ['../../common-styles.css']
})
export class ManageContainerComponent {

  @Input() flashCardsEntity;

  constructor(public fc: FormControllerDirective) { }

}
