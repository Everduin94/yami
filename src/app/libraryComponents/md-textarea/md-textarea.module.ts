import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTextareaComponent } from './md-textarea.component';
import { FormComponentsModule } from 'src/app/formComponents/form-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

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
