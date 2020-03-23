import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { QuestionContentComponent } from '../question-content/question-content.component';
import { FibUtil } from '../add-base/fib-util';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit, AfterViewInit {

  @ViewChild(QuestionContentComponent, {static: false}) qc;

  activeAnswer = null; // TODO: Find a way to refactor out
  answers = [];

  constructor(public cs: ContentStateService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    
  }

  getAnswers(activeContent) {
    const inputs = this.qc.inputs as any[];
    const givenAnswers = inputs.map(v => v.value);
    const definedAnswers = activeContent.fib;
    console.log(definedAnswers);
    console.log(givenAnswers);
    return FibUtil.compareAnswers(definedAnswers, givenAnswers);
  }

}
