import { Component } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { ClientStateService } from 'src/app/services/client-state.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent {

  activeAnswer = null; // TODO: Find a way to refactor out
  answers = [];

  constructor(public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService, ) { }

  toggleAnswer = (v) => v === 'show' ? 'hide' : 'show';
  updateAnswer = (v) => this.client.updateIsAnswerShowing(v);
  isShowing = (v) => v === 'show' ? true : false;
  updateAnswers = (v) => this.client.updateAnswersEvent.next(v);
  setNextActiveFlashcard = (v) => this.client.setActiveFlashcard({index: v.activeIndex + 1});

}
