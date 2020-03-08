import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerContentComponent } from './answer-content.component';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';

@NgModule({
  declarations: [AnswerContentComponent],
  imports: [
    CommonModule,
    MdToHtmlModule
  ],
  exports: [AnswerContentComponent]
})
export class AnswerContentModule { }
