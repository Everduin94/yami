import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBaseComponent } from './add-base.component';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';

import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { QuillModule } from '../quill/quill.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxRouteLinkModule } from 'src/app/libraryComponents/box-route-link/box-route-link.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { HeaderSpanModule } from 'src/app/libraryComponents/header-span/header-span.module';
import { QuestionContentModule } from '../question-content/question-content.module';
import { AnswerContentModule } from '../answer-content/answer-content.module';
import { DetailsFormModule } from '../details-form/details-form.module';
import { FormComponentsModule } from 'src/app/formComponents/form-components.module';
import { AutofocusModule } from 'src/app/libraryComponents/autofocus/autofocus.module';

const routes: Routes = [
  {
    path: '',
    component: AddBaseComponent,
    children: [
      {
        path: 'card',
        component: AddCardComponent
      },
      {
        path: 'test1',
        component: AddCardComponent
      },
      {
        path: 'test2',
        component: AddCardComponent
      }
    ]
  }
] 

@NgModule({
  declarations: [AddBaseComponent, AddCardComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    BoxRouteLinkModule,
    FilterListModule,
    HeaderSpanModule,
    QuestionContentModule,
    AnswerContentModule,
    DetailsFormModule,
    FormComponentsModule,
    AutofocusModule,
    RouterModule.forChild(routes)
  ]
})
export class AddBaseModule { }
