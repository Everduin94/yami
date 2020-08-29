import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidesComponent } from './guides.component';
import { Routes, RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterListModule } from '@components/components-practice/filter-list/filter-list.module';
import { HeaderSpanModule } from '@components/components-lib/header-span/header-span.module';
import { MdToHtmlModule } from 'src/app/pipes/md-to-html.module';
import { ContentGuideComponent } from './content/content-guide.component';
import { MarkdownGuideComponent } from './content/markdown-guide.component';
import { PracticingGuideComponent } from './content/practicing-guide.component';
import { YamiGuideComponent } from './content/yami-guide.component';
import { ContactGuideComponent } from './content/contact-guide.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: '',
    component: GuidesComponent,
  }
] 

@NgModule({
  declarations: [GuidesComponent,
    ContentGuideComponent,
    MarkdownGuideComponent,
    PracticingGuideComponent,
    ContactGuideComponent,
    YamiGuideComponent,
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterListModule,
    HeaderSpanModule,
    MdToHtmlModule,
    RouterModule.forChild(routes)
  ]
})
export class GuidesModule { }
