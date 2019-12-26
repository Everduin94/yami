import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBaseComponent } from './add-base.component';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';

import { MatSliderModule } from '@angular/material/slider';

const routes: Routes = [
  {
    path: '',
    component: AddBaseComponent,
    children: [
      {
        path: 'card',
        component: AddCardComponent
      }
    ]
  }
] 

@NgModule({
  declarations: [AddBaseComponent, AddCardComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    RouterModule.forChild(routes)
  ]
})
export class AddBaseModule { }
