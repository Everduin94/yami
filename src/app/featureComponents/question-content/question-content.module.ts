import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionContentComponent } from './question-content.component';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';

@NgModule({
  declarations: [QuestionContentComponent],
  imports: [
    CommonModule,
    MdToHtmlModule
  ],
  exports: [QuestionContentComponent]
})
export class QuestionContentModule { }
