import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { QuestionContentComponent } from '../question-content/question-content.component';
import { FibUtil } from '../add-base/fib-util';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent {

  activeAnswer = null; // TODO: Find a way to refactor out
  answers = [];
  inputs; // TODO: Manage this state properly as well.

  constructor(public cs: ContentStateService) { }

    
  getAnswers(activeContent) {
    console.log(this.inputs);
    if (!this.inputs) return [];
    const inputs = this.inputs as any[];
    const givenAnswers = inputs.map(v => v.value);
    const definedAnswers = activeContent.fib;
    return FibUtil.compareAnswers(definedAnswers, givenAnswers);
  }

}
