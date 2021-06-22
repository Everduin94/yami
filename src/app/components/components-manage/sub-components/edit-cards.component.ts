import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ManageEvent, ManageEventType } from '../form-controller.directive';

@Component({
  selector: 'app-edit-cards',
  template: `
  <app-filter-list 
      [content]="flashCardsEntity?.entities" 
      [groups]="aggregatedDecks"
      [category]="deck" 
      [activeContent]="flashCardsEntity?.activeCard"
      (clickedEvent)="updateForm($event)">
      <div class="container__filter-list__empty-message">
      </div>
   </app-filter-list>
  `,
  styles: [`
    .host {
      display: grid;
      position: relative;
      grid-row: 1 / -1;
      grid-template-rows: minmax(0, 1fr);
      border-right: none;
      margin-bottom: 5px;
      -webkit-transition: all 1s ease-in-out;
        -moz-transition: all 1s ease-in-out;
        -o-transition: all 1s ease-in-out;
        transition: all 1s ease-in-out;
        background: var(--box-color);
      /*border-top: solid 1px var(--box-shadow);*/
    }
  `]
})
export class EditCardsComponent {

  @Input() deck;
  @Input() aggregatedDecks;
  @Input() flashCardsEntity;
  @Output() actionEvent = new EventEmitter<ManageEvent>();
  updateForm = (event) => this.actionEvent.emit({ type: ManageEventType.UPDATE_FORM, payload: event })

}

