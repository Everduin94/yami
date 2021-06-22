import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-icon-button",
  template: `
    <button
      class="hover-button label-button"
      (click)="clicked.emit($event)"
      [disabled]="disabled"
      mat-raised-button
    >
      <fa-icon [icon]="icon" size="lg"></fa-icon>
      <div>{{ text }}</div>
    </button>
  `,
  styles: [
    `
      .label-button {
        display: grid;
        grid-template-rows: min-content min-content;
      }

      button > fa-icon {
        color: var(--text-color);
      }

      button {
        border: none;
        cursor: pointer;
        appearance: none;
        border-radius: 4px;
      }

      .highlight {
        background: var(--primary-color) !important;
      }

      /* Override */
      .mat-raised-button {
        padding: 0;
        line-height: 26px;
        padding-top: 6px;
      }
    `,
  ],
  styleUrls: ["../common-styles.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  @Input() icon;
  @Input() text;
  @Input() disabled;
  @Output() clicked = new EventEmitter();
}
