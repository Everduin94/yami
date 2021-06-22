import { Component, Input, OnInit, HostListener } from "@angular/core";
import {
  FormControllerDirective,
  ManageEventType,
} from "../form-controller.directive";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { ClientStateService } from "src/app/services/client-state.service";

@Component({
  selector: "app-manage-container",
  template: `
    <form
      style="display:contents"
      [formGroup]="fc.form"
      [appSaveListener]="flashCardsEntity?.activeCard"
      [disableSave]="!(isDirty$ | async) || !fc.form.valid"
      (ngSubmit)="fc.onSubmit(flashCardsEntity?.activeCard)"
      autocomplete="off"
    >
      <app-actions-drawer
        [flashCardsEntity]="flashCardsEntity"
        [deck]="fc.selectedDeck$ | async"
        [aggregatedDecks]="fc.aggregatedDecks$ | async"
        (actionEvent)="fc.consumeActionEvent($event)"
      >
      </app-actions-drawer>

      <!-- Meta Data & Save -->
      <div class="container__details">
        <ng-container *ngIf="navigation$ | async as navigation">
          <ng-container *ngIf="navigation === 'details'">
            <app-header-span dataCy="meta-header" label="Details">
              <span data-cy="details-header-info">
                -
                {{
                  flashCardsEntity?.activeCard?.title
                    ? flashCardsEntity?.activeCard?.title
                    : "Adding New Card"
                }}
              </span>
            </app-header-span>

            <app-flash-card-details></app-flash-card-details>
          </ng-container>

          <ng-container *ngIf="navigation === 'decks'">
            <app-header-span
              dataCy="meta-header"
              label="Decks"
            ></app-header-span>
            <app-deck-manager></app-deck-manager>
          </ng-container>

          <ng-container *ngIf="navigation === 'edit'">
            <ng-container *ngIf="!flashCardsEntity?.activeCard?.title">
              <app-header-span dataCy="meta-header" label="Edit Cards">
              </app-header-span>

              <app-edit-cards
                [flashCardsEntity]="flashCardsEntity"
                [deck]="fc.selectedDeck$ | async"
                [aggregatedDecks]="fc.aggregatedDecks$ | async"
                (actionEvent)="fc.consumeActionEvent($event)"
              >
              </app-edit-cards>
            </ng-container>

            <ng-container *ngIf="flashCardsEntity?.activeCard?.title">
              <app-header-span dataCy="meta-header">
                <div class="editing-header">
                  <div>Details</div>
                  <div data-cy="details-header-info" class="overflow-text">
                    - {{ flashCardsEntity?.activeCard?.title || "" }}
                  </div>
                  <button
                    class="resizer hover-button"
                    (click)="returnToPrevious()"
                  >
                    <fa-icon [icon]="leftIcon"></fa-icon>
                  </button>
                </div>
              </app-header-span>

              <app-flash-card-details> </app-flash-card-details>
            </ng-container>
          </ng-container>
        </ng-container>
      </div>
      
      <ng-container *ngIf="isEditing$ | async">
        <app-question-input
          [form]="fc.form"
          [type]="fc.type?.value"
          [value]="fc.question?.value"
          [practicePreview]="fc.previewMode?.value"
        >
        </app-question-input>

        <app-answer-input
          [form]="fc.form"
          [type]="fc.type?.value"
          [value]="fc.answer?.value"
          [practicePreview]="fc.previewMode?.value"
        >
        </app-answer-input>
      </ng-container>

    </form>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: 100px minmax(255px, 2fr) 6fr;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
            0,
            1fr
          );
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
        grid-template-rows: min-content minmax(0, 1fr) min-content;
        border: 1px solid var(--box-shadow);
      }

      .divider {
        border-color: var(--box-color);
      }

      .expand {
        grid-row: span 4;
      }

      .padded-container--bottom-shadow {
        box-shadow: 0 4px 3px -3px var(--box-shadow);
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

      .save-category-control,
      .back-category-control {
        grid-column: span 1;
      }

      .resizer {
        border: none;
        appearance: none;
        cursor: pointer;
        border-radius: 4px;
        background: var(--box-shadow);
        color: var(--text-color);
        transition: background 0.3s linear;
      }

      .overflow-text {
        max-width: 165px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .editing-header {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content 1fr max-content;
        gap: 4px;
      }

      app-filter-list {
        border-bottom: var(--box-shadow) 1px solid;
      }

      @media (max-width: 768px) {
        :host {
          display: block;
        }
      }
    `,
  ],
  styleUrls: ["../../common-styles.css"],
})
export class ManageContainerComponent implements OnInit {
  @Input() flashCardsEntity;
  isDirty$: Observable<boolean>;
  navigation$: Observable<string>;
  isEditing$: Observable<boolean>;
  readonly leftIcon = faArrowLeft;

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    return this.isDirty$
      .pipe(take(1))
      .subscribe((isDirty) =>
        isDirty ? ($event.returnValue = true) : undefined
      );
  }

  constructor(public fc: FormControllerDirective) {}

  ngOnInit(): void {
    this.isDirty$ = this.fc.isDirty$;
    this.navigation$ = this.fc.navigation$;
    this.isEditing$ = this.fc.isEditing$;
  }

  returnToPrevious() {
    this.fc.consumeActionEvent({ type: ManageEventType.ADD });
  }
}
