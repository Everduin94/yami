import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBaseComponent } from './add-base.component';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';

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
    RouterModule.forChild(routes)
  ]
})
export class AddBaseModule { }
