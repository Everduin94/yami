import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSpanComponent } from './header-span.component';

@NgModule({
  declarations: [HeaderSpanComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderSpanComponent]
})
export class HeaderSpanModule { }
