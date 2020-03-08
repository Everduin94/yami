import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from './flash-cards.component';
import { Routes, RouterModule } from '@angular/router';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { QuillModule } from '../quill/quill.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FilterListModule } from '../filter-list/filter-list.module';
import { HeaderSpanModule } from 'src/app/libraryComponents/header-span/header-span.module';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';

const FLASHCARD_ROUTES: Routes = [
  {
    path: '',
    component: FlashCardsComponent,
    children: []
  },
];

@NgModule({
  declarations: [FlashCardsComponent, FlashCardComponent],
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    MatButtonModule,
    FilterListModule,
    HeaderSpanModule,
    MdToHtmlModule,
    RouterModule.forChild(FLASHCARD_ROUTES)
  ]
})
export class FlashCardsModule { }
