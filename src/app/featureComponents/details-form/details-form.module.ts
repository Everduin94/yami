import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsFormComponent } from './details-form.component';

@NgModule({
  declarations: [DetailsFormComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DetailsFormComponent
  ]
})
export class DetailsFormModule { }
