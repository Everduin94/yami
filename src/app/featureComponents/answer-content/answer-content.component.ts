import { Component, OnInit, Input, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-answer-content',
  templateUrl: './answer-content.component.html',
  styleUrls: ['./answer-content.component.css']
})
export class AnswerContentComponent implements OnInit {

  @ViewChildren("fib") inputs;
  @Input() activeContent;

  _answers;
  @Input() set answers(v) { 
    console.log('new answers: ', v)
    this._answers = v;
  }
  get answers() { return this._answers; }  

  constructor() { }

  ngOnInit() {
  }

}
