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

  constructor(public cs: ContentStateService, public client: ClientStateService) { }

  // Lesson: How do you calculate the answers, with just "activeContent?"
  // You can't. You need the inputs. To make this functional, pass in all the necessary state.
  getAnswers(activeContent) {
    
    //const givenAnswers = inputs.map(v => v.value);
    //const definedAnswers = activeContent.fib;
    //return FibUtil.compareAnswers(definedAnswers, givenAnswers);
  }

  toggleAnswer = (v) => v === 'show' ? 'hide' : 'show';
  updateAnswer = (v) => this.client.updateIsAnswerShowing(v);
  isShowing = (v) => v === 'show' ? true : false;
  updateAnswers = (v) => this.client.updateAnswersEvent.next(v);
}
