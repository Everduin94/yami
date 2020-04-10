import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextInputComponent } from './form-text-input/form-text-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';

@NgModule({
  declarations: [
    FormSelectComponent,
    FormTextInputComponent,
    FormTextareaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    FormSelectComponent,
    FormTextInputComponent,
    FormTextareaComponent
  ]
})
export class FormComponentsModule { }
