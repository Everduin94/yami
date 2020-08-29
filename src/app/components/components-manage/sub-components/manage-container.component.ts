import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { FormControllerDirective } from '../form-controller.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-container',
  template: `
    <form style="display:contents" [formGroup]="fc.form" (ngSubmit)="fc.onSubmit(flashCardsEntity.activeCard)" autocomplete="off">
        

    
        <app-actions-drawer 
        [flashCardsEntity]="flashCardsEntity"
        [deck]="fc.selectedDeck$ | async"
        [aggregatedDecks]="fc.aggregatedDecks$ | async"
        [isOpen]="isOpen"
        (actionEvent)="fc.consumeActionEvent($event)"
        (resizeEvent)="resize()">
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
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -o-transition: all 1s;
        transition: all 1s;
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

    .isOpen {
      background: var(--background-color);
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
    
    @media (max-width: 768px) { 
    
      :host {
        display: block;
      }

    }
    
  `],
  styleUrls: ['../../common-styles.css']
})
export class ManageContainerComponent implements OnInit {
  

  @Input() flashCardsEntity;
  @HostBinding('style.grid-template-columns') columns;
  isOpen;

  constructor(public fc: FormControllerDirective, private sanitzer: DomSanitizer) { }

  ngOnInit(): void {
    this.isOpen = this.isLocalOpen();
    this.columns = this.resizeColumns();
  }

  isLocalOpen(): boolean {
    if (!localStorage) return true;
    const isPanelOpen = localStorage.getItem('panelOpen');
    if (isPanelOpen == "false") return false;
    else return true;
  }

  resize(): void {
    this.isOpen = !this.isOpen;
    this.columns = this.resizeColumns();
    if (localStorage) localStorage.setItem('panelOpen', JSON.stringify(this.isOpen));
  }

  resizeColumns(): SafeStyle {
    if (this.isOpen) return this.sanitzer.bypassSecurityTrustStyle(`2fr minmax(255px, 2fr) 6fr`);
    if (!this.isOpen) return this.sanitzer.bypassSecurityTrustStyle(`100px minmax(255px, 2fr) 6fr`);
  }

}
