import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements OnInit {

  @Input() activeContent;

  constructor() { }

  ngOnInit() {
  }

}
