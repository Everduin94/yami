import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTextareaComponent } from './md-textarea.component';
import { FormComponentsModule } from '@components/components-lib/form-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MdTextareaComponent],
  exports: [MdTextareaComponent],
  imports: [
    FontAwesomeModule,
    FormComponentsModule,
    CommonModule
  ]
})
export class MdTextareaModule { }
