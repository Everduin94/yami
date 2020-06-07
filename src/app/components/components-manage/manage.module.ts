import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxRouteLinkModule } from '@components/components-lib/box-route-link/box-route-link.module';
import { FilterListModule } from '../components-practice/filter-list/filter-list.module';
import { HeaderSpanModule } from '@components/components-lib/header-span/header-span.module';
import { QuestionContentModule } from '../components-practice/question-content/question-content.module';
import { AnswerContentModule } from '../components-practice/answer-content/answer-content.module';
import { FormComponentsModule } from '@components/components-lib/form-components.module';
import { AutofocusModule } from '@components/components-lib/autofocus/autofocus.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MdTextareaModule } from '@components/components-lib/md-textarea/md-textarea.module';
import { DeckInputComponent } from './sub-components/deck-input/deck-input.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { LoadingModule } from '@components/components-lib/loading/loading.module';
import { ActionsDrawerComponent } from 'src/app/components/components-manage/sub-components/actions-drawer.component';
import { QuestionInputComponent } from '@components/components-manage/sub-components/question-input.component';
import { MdTextareaWithPreviewComponent } from '@components/components-manage/sub-components/md-textarea-with-preview.component';
import { AnswerInputComponent } from '@components/components-manage/sub-components/answer-input.component';
import { FormControllerDirective } from '@components/components-manage/form-controller.directive';
import { FlashCardDetailsComponent } from '@components/components-manage/sub-components/flash-card-details.component';
import { ManageContainerComponent } from '@components/components-manage/sub-components/manage-container.component';
import { ManageComponent } from './manage.component';
import { DeckManagerComponent } from './sub-components/deck-manager/deck-manager.component';
import { DeckTreeComponent } from './sub-components/deck-manager/deck-tree/deck-tree.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
  },
  {
    path: 'table',
    component: DeckManagerComponent
  }
]

@NgModule({
  declarations: [
    ManageComponent,
    ActionsDrawerComponent,
    QuestionInputComponent,
    MdTextareaWithPreviewComponent,
    AnswerInputComponent,
    FormControllerDirective,
    FlashCardDetailsComponent,
    ManageContainerComponent,
    DeckInputComponent,
    DeckManagerComponent,
    DeckTreeComponent
  ],
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
    FormComponentsModule,
    FontAwesomeModule,
    MdToHtmlModule,
    AutofocusModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageModule { }
