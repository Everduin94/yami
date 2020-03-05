import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrototypeComponent } from './prototype.component';
import { PrototypeDirective } from './prototype.directive';

@NgModule({
  declarations: [
    PrototypeComponent,
    PrototypeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrototypeComponent
  ]
})
export class PrototypeModule { }
