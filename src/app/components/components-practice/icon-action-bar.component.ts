import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ContentChild, NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { HeaderSpanModule } from "@components/components-lib/header-span/header-span.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-icon-action-bar",
  template: `
    <div class="icon-container">
      <ng-container *ngTemplateOutlet="buttons"></ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        position: relative;
        grid-row: 1 / -1;
        grid-template-rows: minmax(0, 1fr);
        margin-bottom: 5px;
        -webkit-transition: all 1s ease-in-out;
        -moz-transition: all 1s ease-in-out;
        -o-transition: all 1s ease-in-out;
        transition: all 1s ease-in-out;
        background: var(--box-color);
        /*border-top: solid 1px var(--box-shadow);*/
      }

      .icon-container {
          margin-top: 40px;
          display: grid;
          gap: 5px;
          padding: 5px;
          grid-auto-flow: rows;
          grid-auto-rows: 58px;
      }

      @media (max-width: 768px) {
        
        .icon-container {
          margin-top: 0;
          display: flex;
        }

      }

    `,
  ],
  styleUrls: ["../common-styles.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconActionBarComponent {
  @ContentChild('buttons', {static: true}) buttons;
}

@NgModule({
  declarations: [IconActionBarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderSpanModule,
  ],
  exports: [IconActionBarComponent],
})
export class IconActionBarModule {}
