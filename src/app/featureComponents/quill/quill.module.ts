import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillComponent } from './quill.component';

@NgModule({
  declarations: [QuillComponent],
  imports: [
    CommonModule
  ],
  exports: [QuillComponent]
})
export class QuillModule { }
