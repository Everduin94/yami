import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrototypeComponent } from './prototype.component';
import { PrototypeDirective } from './prototype.directive';
import { MdToHtmlPipe } from 'src/app/pipes/md-to-html.pipe';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';
import { FilterListModule } from 'src/app/featureComponents/filter-list/filter-list.module';

@NgModule({
  declarations: [
    PrototypeComponent,
    PrototypeDirective,
  ],
  imports: [
    CommonModule,
    MdToHtmlModule,
    FilterListModule
  ],
  exports: [
    PrototypeComponent
  ]
})
export class PrototypeModule { }
