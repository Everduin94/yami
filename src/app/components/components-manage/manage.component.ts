import { Component } from '@angular/core';
import { ClientStateService } from 'src/app/services/client-state.service';

@Component({
  selector: 'app-manage',
  template: `
    <ng-container *ngIf="client.flashCards$ | async as flashCardsEntity">
        <app-manage-container appFormController
            [activeContent]="flashCardsEntity?.activeCard"
            [flashCardsEntity]="flashCardsEntity"
        ></app-manage-container>
    </ng-container>
  `,
  styles: [`
    :host {
        display: block;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
        min-height: 0;
        overflow: hidden;
    }
  `]
})
export class ManageComponent {

  constructor(public client: ClientStateService) { }

}
