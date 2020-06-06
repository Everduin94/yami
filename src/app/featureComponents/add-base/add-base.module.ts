import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBaseComponent } from './add-base.component';
import { Routes, RouterModule } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxRouteLinkModule } from 'src/app/libraryComponents/box-route-link/box-route-link.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { HeaderSpanModule } from 'src/app/libraryComponents/header-span/header-span.module';
import { QuestionContentModule } from '../question-content/question-content.module';
import { AnswerContentModule } from '../answer-content/answer-content.module';
import { DetailsFormModule } from '../details-form/details-form.module';
import { FormComponentsModule } from 'src/app/formComponents/form-components.module';
import { AutofocusModule } from 'src/app/libraryComponents/autofocus/autofocus.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MdTextareaModule } from 'src/app/libraryComponents/md-textarea/md-textarea.module';
import { DeckInputComponent } from './deck-input/deck-input.component';
import { DeckManagerComponent } from './deck-manager/deck-manager.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { DeckTreeComponent } from './deck-manager/deck-tree/deck-tree.component';
import { LoadingModule } from 'src/app/libraryComponents/loading/loading.module';
import { ActionsDrawerComponent } from 'src/app/components/components-manage/sub-components/actions-drawer.component';
import { QuestionInputComponent } from '@components/components-manage/sub-components/question-input.component';
import { MdTextareaWithPreviewComponent } from '@components/components-manage/sub-components/md-textarea-with-preview.component';
import { AnswerInputComponent } from '@components/components-manage/sub-components/answer-input.component';
import { FormControllerDirective } from '@components/components-manage/form-controller.directive';
import { FlashCardDetailsComponent } from '@components/components-manage/sub-components/flash-card-details.component';

const routes: Routes = [
  {
    path: '',
    component: AddBaseComponent,
  },
  {
    path:'table',
    component: DeckManagerComponent
  }
] 

@NgModule({
  declarations: [
    ActionsDrawerComponent,
    QuestionInputComponent,
    MdTextareaWithPreviewComponent,
    AnswerInputComponent,
    FormControllerDirective,
    FlashCardDetailsComponent,
    AddBaseComponent, DeckInputComponent, DeckManagerComponent, DeckTreeComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule,
    BoxRouteLinkModule,
    FilterListModule,
    HeaderSpanModule,
    QuestionContentModule,
    AnswerContentModule,
    MdTextareaModule,
    DetailsFormModule,
    FormComponentsModule,
    FontAwesomeModule,
    MdToHtmlModule,
    AutofocusModule,
    RouterModule.forChild(routes)
  ]
})
export class AddBaseModule { }
