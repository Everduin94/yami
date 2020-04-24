import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientStateService } from 'src/app/services/client-state.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.css']
})
export class GuidesComponent implements OnInit, OnDestroy {
  

  activeGuideContent;

  guideCategories = [
    {value: 'Guides'},
  ]

  content = [
    {title: 'What is Yami', key: 'yami'},
    {title: 'Adding Content', key: 'content'},
    {title: 'Practicing', key: 'practicing'},
    {title: 'What is Markdown', key: 'markdown'}
  ]

  constructor(private client: ClientStateService) { }

  ngOnInit() {
    this.activeGuideContent = this.content[0];
  }

  ngOnDestroy(): void {
    this.client.updateActiveContent({});
  }

}
