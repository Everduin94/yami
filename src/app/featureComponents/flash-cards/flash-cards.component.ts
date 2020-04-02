import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { QuestionContentComponent } from '../question-content/question-content.component';
import { FibUtil } from '../add-base/fib-util';
import { ClientStateService } from 'src/app/services/client-state.service';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent {

  activeAnswer = null; // TODO: Find a way to refactor out
  answers = [];
  inputs; // TODO: Manage this state properly as well.

  constructor(public cs: ContentStateService, public client: ClientStateService) { }

  // Lesson: How do you calculate the answers, with just "activeContent?"
  // You can't. You need the inputs. To make this functional, pass in all the necessary state.
  getAnswers(activeContent) {
    console.log(this.inputs);
    if (!this.inputs) return [];
    const inputs = this.inputs as any[]; // TODO: This is unpure state
    const givenAnswers = inputs.map(v => v.value);
    const definedAnswers = activeContent.fib;
    return FibUtil.compareAnswers(definedAnswers, givenAnswers);
  }

  toggleAnswer = (v) => v === 'show' ? 'hide' : 'show';
  updateAnswer = (v) => this.client.updateIsAnswerShowing(v);

}
