import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBaseComponent } from './add-base.component';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';

import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { QuillModule } from '../quill/quill.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxRouteLinkModule } from 'src/app/libraryComponents/box-route-link/box-route-link.module';

const routes: Routes = [
  {
    path: '',
    component: AddBaseComponent,
    children: [
      {
        path: 'card',
        component: AddCardComponent
      },
      {
        path: 'test1',
        component: AddCardComponent
      },
      {
        path: 'test2',
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
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    BoxRouteLinkModule,
    RouterModule.forChild(routes)
  ]
})
export class AddBaseModule { }
