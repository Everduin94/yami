import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer-content',
  templateUrl: './answer-content.component.html',
  styleUrls: ['./answer-content.component.css']
})
export class AnswerContentComponent implements OnInit {

  @Input() activeContent;

  constructor() { }

  ngOnInit() {
  }

}
