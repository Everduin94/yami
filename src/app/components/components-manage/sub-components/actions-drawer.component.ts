import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from "@angular/core";
import {
  ManageEventType,
  ManageEvent,
  FormControllerDirective,
} from "../form-controller.directive";

import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faUndo } from "@fortawesome/free-solid-svg-icons/faUndo";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";

@Component({
  selector: "app-actions-drawer",
  template: `
    <div class="icon-container">
      <ng-container *ngIf="navigation$ | async as navigation">
        <div class="navigation-buttons">
          <button
            class="hover-button label-button"
            [class.highlight]="navigation === 'decks'"
            (click)="openDecks(); $event.preventDefault()"
            data-cy="open-modal-small-button"
            mat-raised-button
          >
            <fa-icon [icon]="decksIcon" size="lg"></fa-icon>
            <div>Decks</div>
          </button>
          <button
            class="hover-button label-button"
            (click)="openEdit(); $event.preventDefault()"
            [class.highlight]="navigation === 'edit'"
            data-cy="open-modal-small-button"
            mat-raised-button
          >
            <fa-icon [icon]="editIcon" size="lg"></fa-icon>
            <div>Edit Cards</div>
          </button>
          <button
            class="hover-button label-button"
            (click)="openDetails(); $event.preventDefault()"
            [class.highlight]="navigation === 'details'"
            data-cy="add-content-small-button"
            mat-raised-button
          >
            <fa-icon [icon]="addIcon" size="lg"></fa-icon>
            <div>New Card</div>
          </button>
        </div>

        <ng-container *ngIf="isEditing$ | async">
          <div class="nav-action-separator">
            <hr />
          </div>

          <div class="action-buttons">
            <button
              class="hover-button label-button"
              [disabled]="!(isDirty$ | async) || !fc.form.valid"
              data-cy="copy-content-button"
              mat-raised-button
            >
              <fa-icon [icon]="saveIcon" size="lg"></fa-icon>
              <div>Save</div>
            </button>
            <button
              class="hover-button label-button"
              [disabled]="!(isDirty$ | async) || !flashCardsEntity?.activeCard"
              (click)="
                fc.cancel(flashCardsEntity?.activeCard); $event.preventDefault()
              "
              data-cy="copy-content-button"
              mat-raised-button
            >
              <fa-icon [icon]="undoIcon" size="lg"></fa-icon>
              <div>Reset Card</div>
            </button>
            <button
              class="hover-button label-button"
              [disabled]="!flashCardsEntity?.activeCard?.id"
              (click)="copyRow(); $event.preventDefault()"
              data-cy="copy-content-button"
              mat-raised-button
            >
              <fa-icon [icon]="copyIcon" size="lg"></fa-icon>
              <div>Copy Card</div>
            </button>
            <button
              class="hover-button--warn label-button"
              [disabled]="!flashCardsEntity?.activeCard?.id"
              (click)="
                deleteRow(flashCardsEntity.activeCard); $event.preventDefault()
              "
              data-cy="delete-content-button"
              mat-raised-button
            >
              <fa-icon [icon]="deleteIcon" size="lg"></fa-icon>
              <div>Delete Card</div>
            </button>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
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

      .navigation-buttons {
        display: grid;
        grid-auto-rows: 58px;
        grid-template-rows: repeat(3, 58px);
        padding: 5px;
        gap: 5px;
      }

      .action-buttons {
        display: grid;
        grid-auto-rows: 58px;
        grid-template-rows: repeat(4, 58px);
        padding: 5px;
        gap: 5px;
      }

      .highlight {
        background: var(--primary-color) !important;
      }

      .nav-action-separator {
        padding-left: 10px;
        padding-right: 10px;
      }

      .mat-raised-button {
        padding: 0;
        line-height: 26px;
        padding-top: 6px;
      }

      .label-button {
        display: grid;
        grid-template-rows: min-content min-content;
      }

      .button-container {
        display: grid;
        padding: 5px;
        gap: 5px;
      }

      .icon-container {
        display: grid;
        grid-template-rows: repeat(3, min-content);
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

        transition: background 0.3s linear;
      }

      @media (max-width: 768px) {
        :host {
          border-top: solid 1px var(--box-shadow);
          margin: 0;
        }

        .icon-container {
          margin-top: 0;
        }

        .icon-container > button {
          padding: 0;
        }

        .navigation-buttons {
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: repeat(3, 1fr);
          padding: 5px;
          gap: 5px;
        }

        .action-buttons {
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: repeat(4, 1fr);
          padding: 5px;
          gap: 5px;
        }
      }
    `,
  ],
  styleUrls: ["../../common-styles.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsDrawerComponent implements OnInit {
  @Input() deck;
  @Input() aggregatedDecks;
  @Input() flashCardsEntity;
  @Output() actionEvent = new EventEmitter<ManageEvent>();

  readonly editIcon = faEdit;
  readonly decksIcon = faBars;
  readonly addIcon = faPlusCircle;
  readonly copyIcon = faCopy;
  readonly deleteIcon = faTrash;
  readonly saveIcon = faSave;
  readonly undoIcon = faUndo;

  isDirty$;
  navigation$;
  isEditing$;

  constructor(public fc: FormControllerDirective) {}

  ngOnInit(): void {
    this.isDirty$ = this.fc.isDirty$;
    this.navigation$ = this.fc.navigation$;
    this.isEditing$ = this.fc.isEditing$;
  }

  openDecks = () => {
    this.fc.updateNavigation("decks");
    this.addRow();
  };
  openEdit = () => {
    this.fc.updateNavigation("edit");
    this.addRow();
  };
  openDetails = () => {
    this.fc.updateNavigation("details");
    this.addRow();
  };
  addRow = () => this.actionEvent.emit({ type: ManageEventType.ADD });
  deleteRow = (activeCard) =>
    this.actionEvent.emit({
      type: ManageEventType.DELETE,
      payload: activeCard,
    });
  copyRow = () => this.actionEvent.emit({ type: ManageEventType.COPY });
  updateForm = (event) =>
    this.actionEvent.emit({
      type: ManageEventType.UPDATE_FORM,
      payload: event,
    });
}
