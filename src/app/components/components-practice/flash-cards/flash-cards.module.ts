import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from './flash-cards.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FilterListModule } from '../filter-list/filter-list.module';
import { HeaderSpanModule } from '@components/components-lib/header-span/header-span.module';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';
import { QuestionContentModule } from '../question-content/question-content.module';
import { AnswerContentModule } from '../answer-content/answer-content.module';
import { NextListenerDirective } from './next-listener.directive';
import { ShowListenerDirective } from './show-listener.directive';
import { IconActionBarModule } from '../icon-action-bar.component';
import { FormComponentsModule } from '@components/components-lib/form-components.module';
import { ScrollSyncDirective } from './scroll-sync.directive';

const FLASHCARD_ROUTES: Routes = [
  {
    path: '',
    component: FlashCardsComponent,
    children: []
  },
];

@NgModule({
  declarations: [FlashCardsComponent, NextListenerDirective, ShowListenerDirective, ScrollSyncDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    FilterListModule,
    HeaderSpanModule,
    MdToHtmlModule,
    QuestionContentModule,
    AnswerContentModule,
    IconActionBarModule,
    FormComponentsModule,
    RouterModule.forChild(FLASHCARD_ROUTES)
  ]
})
export class FlashCardsModule { }
