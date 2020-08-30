import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ManageEventType, ManageEvent } from '../form-controller.directive';
import { MatDialog } from '@angular/material/dialog';
import { DeckManagerComponent } from './deck-manager/deck-manager.component';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

@Component({
  selector: 'app-actions-drawer',
  template: `

    <ng-container *ngIf="isOpen">
      <button (click)="resize(); $event.preventDefault();" class="resizer hover-button"> 
        <fa-icon [icon]="leftIcon"></fa-icon>
      </button>
    
    <app-filter-list 
      [content]="flashCardsEntity?.entities" 
      [groups]="aggregatedDecks"
      [category]="deck" 
      [activeContent]="flashCardsEntity?.activeCard"
      (clickedEvent)="updateForm($event)">
      <div class="container__filter-list__empty-message">
      </div>
    </app-filter-list>
    
    
      <app-header-span dataCy="action-header" label="Actions"></app-header-span>
      <div class="button-container">
        <button class="hover-button" (click)="openModal(); $event.preventDefault();" mat-raised-button
          data-cy="open-modal-button">
          Manage Decks
        </button>
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
      </ng-container>

      <ng-container *ngIf="!isOpen">
      <div class="icon-container">
        <button class="hover-button" (click)="resize(); $event.preventDefault();" 
          data-cy="resize-small-button" mat-raised-button>
          <fa-icon [icon]="rightIcon" size="lg"></fa-icon>
        </button>
        <button class="hover-button" (click)="openModal(); $event.preventDefault();" 
          data-cy="open-modal-small-button" mat-raised-button>
          <fa-icon [icon]="manageIcon" size="lg"></fa-icon>
        </button>
        <button class="hover-button" (click)="addRow(); $event.preventDefault();"
          data-cy="add-content-small-button" mat-raised-button>
          <fa-icon [icon]="addIcon" size="lg"></fa-icon>
        </button>
        <button class="hover-button" [disabled]="!flashCardsEntity?.activeCard?.id"
          (click)="copyRow(); $event.preventDefault();" 
          data-cy="copy-content-button" mat-raised-button>
          <fa-icon [icon]="copyIcon" size="lg"></fa-icon>
        </button>
        <button class="hover-button--warn" [disabled]="!flashCardsEntity?.activeCard?.id"
          (click)="deleteRow(flashCardsEntity.activeCard); $event.preventDefault();" 
          data-cy="delete-content-button" mat-raised-button>
          <fa-icon [icon]="deleteIcon" size="lg"></fa-icon>
        </button>
      </div>
      </ng-container>
  `,
  styles: [`

    :host {
      display: grid;
      position: relative;
      grid-row: 1 / -1;
      grid-template-rows: minmax(0, 1fr);
      border-right: none;
      margin-bottom: 5px;
      -webkit-transition: all 1s ease-in-out;
        -moz-transition: all 1s ease-in-out;
        -o-transition: all 1s ease-in-out;
        transition: all 1s ease-in-out;
        background: var(--box-color);
      /*border-top: solid 1px var(--box-shadow);*/
    }

    .button-container {
      display: grid;
      padding: 5px;
      gap: 5px;
    }

    .icon-container {
      display: grid;
      grid-auto-rows: 50px;
      padding: 5px;
      gap: 5px;
      margin-top: 40px;
    }

    .icon-container > button > fa-icon {
      color: var(--text-color);
    }

    .icon-container > button {
      border: none;
      cursor: pointer;
      appearance: none;
      border-radius: 4px;
    }

    .resizer {
      position: absolute;
      top: 10px;
      right: 10px;

      border: none;
      appearance: none;
      cursor: pointer;
      border-radius: 4px;
      background: var(--box-shadow);
      color: var(--text-color);

      transition: background .3s linear;
    }

    @media (max-width: 768px) { 

      :host {
        border-top: solid 1px var(--box-shadow);
        margin: 0;
      }
    
      .icon-container {
        margin: 0;
        grid-auto-columns: 65px;
        grid-auto-flow: column;
        overflow-x: auto;
        align-self: center;
        justify-self: center;
        padding: 6px;
      }

      .icon-container > button {
        padding: 0;
      }

    }
  
  `],
  styleUrls: ['../../common-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsDrawerComponent {

  @Input() deck;
  @Input() @HostBinding('class.isOpen') isOpen;
  @Input() aggregatedDecks;
  @Input() flashCardsEntity;
  @Output() actionEvent = new EventEmitter<ManageEvent>();
  @Output() resizeEvent = new EventEmitter();

  readonly rightIcon = faChevronRight;
  readonly leftIcon = faChevronLeft;
  readonly manageIcon = faBars;
  readonly addIcon = faPlusCircle;
  readonly copyIcon = faCopy;
  readonly deleteIcon = faTrash;

  constructor(private dialog: MatDialog) {

    const test: string = 'Hello World!';
    const chars: String[] = test.split('');
    const reversed = chars.reverse().join('');
  }

  openModal = () => {
    const dialogRef = this.dialog.open(DeckManagerComponent, {
      width: '400px',
    });
  }
  resize = () => this.resizeEvent.emit();
  addRow = () => this.actionEvent.emit({ type: ManageEventType.ADD })
  deleteRow = (activeCard) => this.actionEvent.emit({ type: ManageEventType.DELETE, payload: activeCard })
  copyRow = () => this.actionEvent.emit({ type: ManageEventType.COPY })
  updateForm = (event) => this.actionEvent.emit({ type: ManageEventType.UPDATE_FORM, payload: event })

}
