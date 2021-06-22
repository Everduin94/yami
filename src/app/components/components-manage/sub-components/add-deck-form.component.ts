import { Component, Input, OnInit, Optional } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons/faLongArrowAltLeft";
import { FormControllerDirective } from "../form-controller.directive";

@Component({
  selector: "app-add-deck-form",
  template: `
    <div [formGroup]="form" class="add-deck-form-container">
      <mat-form-field>
        <input
          matInput
          placeholder="Deck *"
          appAutofocus
          formControlName="deck"
          autocomplete="off"
        />
      </mat-form-field>

      <ng-container *ngIf="fc.showAddGroup">
        <mat-form-field class="group-input">
          <input
            #addGroupInput
            matInput
            appAutofocus
            placeholder="Group (Optional)"
            formControlName="group"
            autocomplete="off"
          />
        </mat-form-field>

        <button
          class="hover-button return-button"
          (click)="
            fc.showAddGroup = !fc.showAddGroup;
            clearGroup();
            $event.preventDefault()
          "
        >
          <fa-icon title="Return to Dropdown" [icon]="backIcon"></fa-icon>
        </button>
      </ng-container>

      <ng-container *ngIf="!fc.showAddGroup">
        <app-form-select
          class="group-select"
          [form]="form"
          [selectData]="allGroups"
          label="Group (Optional)"
          controlName="group"
        >
        </app-form-select>

        <button
          class="hover-button add-button"
          (click)="
            fc.showAddGroup = !fc.showAddGroup;
            clearGroup();
            $event.preventDefault()
          "
        >
          <fa-icon title="Add New Group" [icon]="addIcon"></fa-icon>
        </button>
      </ng-container>
    </div>
  `,
  styles: [
    `
      /* Dulicate classes, extract, see deck-input */
      .add-button,
      .return-button {
        grid-row: 2 / span 1;
        grid-column: 2 / span 1;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        padding: 0;
        border: none;
        appearance: none;
        cursor: pointer;
        background: var(--box-color);
        justify-self: center;
        align-self: center;
        transition: background-color 0.3s linear;
        /* box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);*/
      }

      .add-button:hover {
        background: var(--primary-color);
      }

      .return-button:hover {
        background: var(--cancel-color);
      }

      .add-button fa-icon,
      .return-button fa-icon {
        color: var(--text-color);
      }

      .add-deck-form-container {
        padding: 8px;
        padding-bottom: 0px;
      }

      .add-deck-form-container {
        display: grid;
        grid-column: span 2;

        gap: 8px;
        grid-template-columns: 1fr min-content;
      }

      .group-select,
      .group-input {
        grid-row: 2 / span 1;
        grid-column: 1 / span 1;
        margin-left: 15px;
      }
    `,
  ],
})
export class AddDeckFormComponent implements OnInit {
  @Input() form: FormGroup;

  allGroups = [];
  _groups;
  @Input() set groups(update) {
    this._groups = update;
    this.allGroups = this._groups.groups.map((g) => ({
      value: g.value,
      id: g.value,
    }));
  }
  get groups() {
    return this._groups;
  }

  readonly addIcon = faPlusCircle;
  readonly backIcon = faLongArrowAltLeft;

  constructor(
    public fc: FormControllerDirective,
    @Optional() private fd: FormGroupDirective
  ) {}

  ngOnInit() {
    this.form =
      !this.form && this.fd && this.fd.form ? this.fd.form : this.form;
  }

  clearForm() {
    this.clearGroup();
  }

  public clearGroup = () => this.fc.group.reset();
  public returnToForm = () => this.fc.returnToForm();
}
