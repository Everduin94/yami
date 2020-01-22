import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxRouteLinkComponent } from './box-route-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BoxRouteLinkComponent],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
    BoxRouteLinkComponent
  ]
})
export class BoxRouteLinkModule { }
