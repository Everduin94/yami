import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

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
    {title: 'What is Yami?', file: 'what-is-yami.md'}
  ]


  markdownContent; // TODO: Refactor this and the get call

  getMarkdownFileFromServer = f => { 
    this.http.get('/assets/'+f.file, {responseType: 'text'}).pipe(take(1)).subscribe(v => this.markdownContent = v);
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
