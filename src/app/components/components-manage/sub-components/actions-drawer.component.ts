import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ManageEventType, ManageEvent } from '../form-controller.directive';

@Component({
  selector: 'app-actions-drawer',
  template: `
    <app-filter-list 
      [content]="flashCardsEntity?.entities" 
      [groups]="aggregatedDecks"
      [category]="deck" 
      [activeContent]="flashCardsEntity?.activeCard"
      (clickedEvent)="updateForm($event)">
      <div class="container__filter-list__empty-message">
      </div>
    </app-filter-list>

    <div>
      <app-header-span dataCy="action-header" label="Actions"></app-header-span>
      <div class="button-container">
        <button class="hover-button" (click)="addRow(); $event.preventDefault();" mat-raised-button
          data-cy="add-content-button">
          Start New Card
        </button>
        <button class="hover-button" [disabled]="!flashCardsEntity?.activeCard?.id"
          (click)="copyRow(); $event.preventDefault();" mat-raised-button
          data-cy="copy-content-button">
          Copy Card
        </button>
        <button class="hover-button--warn" [disabled]="!flashCardsEntity?.activeCard?.id"
          (click)="deleteRow(flashCardsEntity.activeCard); $event.preventDefault();" mat-raised-button
          data-cy="delete-content-button">
          Delete Card
        </button>
      </div>
  `,
  styles: [`

    :host {
      display: grid;
      grid-row: 1 / -1;
      grid-template-rows: minmax(0, 1fr);
      border-right: none;
      margin-bottom: 5px;
    }

    .button-container {
      display: grid;
      padding: 5px;
      gap: 5px;
    }
  
  `],
  styleUrls: ['../../common-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsDrawerComponent {

  @Input() deck;
  @Input() aggregatedDecks;
  @Input() flashCardsEntity;
  @Output() actionEvent = new EventEmitter<ManageEvent>();

  addRow = () => this.actionEvent.emit({ type: ManageEventType.ADD })
  deleteRow = (activeCard) => this.actionEvent.emit({ type: ManageEventType.DELETE, payload: activeCard })
  copyRow = () => this.actionEvent.emit({ type: ManageEventType.COPY })
  updateForm = (event) => this.actionEvent.emit({ type: ManageEventType.UPDATE_FORM, payload: event })

}
