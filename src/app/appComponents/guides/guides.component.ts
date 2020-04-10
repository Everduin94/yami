import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.css']
})
export class GuidesComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    this.activeGuideContent = this.content[0];
  }

}
