import { Component, HostBinding, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControllerDirective } from '../form-controller.directive';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-flash-card-details',
  template: `
      <app-form-text-input #title [form]="formController.form" label="Name *" controlName="title">
      </app-form-text-input>

       <ng-container *ngIf="formController.deckRef$ | async as decks">
          <ng-container *ngIf="formController.aggregatedDecks$ | async as groups">
           <app-deck-input
             [decks]="decks"
             [form]="formController.form"
             [groups]="groups"> 
           </app-deck-input>
          </ng-container>
      </ng-container>
            
      <app-form-select [form]="formController.form" [selectData]="types" label="Type" controlName="type">
      </app-form-select>

      <ng-container *ngIf="focusTitle$ | async"></ng-container>
  `,
  styles: [`
    :host {
      display: grid;
      row-gap: 5px;
      padding: 10px;
      padding-left: 15px;
      padding-right: 15px;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      box-shadow:  0 4px 3px -3px var(--box-shadow);
    }
  `],
  styleUrls: ['../../common-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashCardDetailsComponent {
  

  @HostBinding('class') scrollDiv = 'scroll-div'
  @ViewChild('title', { static: false }) titleElement;
  readonly types = [{id: 'basic', value: 'Basic'}, {id: 'fib', value: 'Fill in Blank (Cloze)'}]
  readonly focusTitle$ = this.formController.addEvent$.pipe(
    filter(_ => this.titleElement && this.titleElement.inputElement),
    tap(_ => this.titleElement.inputElement.nativeElement.focus())
  );

  constructor(public formController: FormControllerDirective) { }
  
}
