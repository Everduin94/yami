import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTextareaComponent } from './md-textarea.component';
import { FormComponentsModule } from 'src/app/formComponents/form-components.module';

@NgModule({
  declarations: [MdTextareaComponent],
  exports: [MdTextareaComponent],
  imports: [
    FormComponentsModule,
    CommonModule
  ]
})
export class MdTextareaModule { }
