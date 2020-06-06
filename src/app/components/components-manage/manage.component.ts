import { Component, OnInit } from '@angular/core';
import { ClientStateService } from 'src/app/services/client-state.service';

@Component({
  selector: 'app-manage',
  template: `
    <ng-container *ngIf="client.flashCards$ | async as flashCardsEntity">
        <!-- Place add-base here as manage-container and add the directive -->
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
export class ManageComponent implements OnInit {

  constructor(public client: ClientStateService) { }

  ngOnInit() {
  }

}
