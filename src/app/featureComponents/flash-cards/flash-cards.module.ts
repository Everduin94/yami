import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from './flash-cards.component';
import { Routes, RouterModule } from '@angular/router';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { QuillComponent } from '../quill/quill.component';

const FLASHCARD_ROUTES: Routes = [
  {
    path: '',
    component: FlashCardsComponent,
    children: []
  },
];

@NgModule({
  declarations: [FlashCardsComponent, FlashCardComponent, QuillComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FLASHCARD_ROUTES)
  ]
})
export class FlashCardsModule { }
