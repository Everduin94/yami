import { Component, OnInit } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { ClientStateService } from 'src/app/services/client-state.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  activeAnswer = null; // TODO: Find a way to refactor out
  answers = [];

  public readonly answerIcon = faCheck;
  public readonly nextIcon = faArrowRight;

  constructor(public auth: FirebaseAuthService, public cs: ContentStateService, public client: ClientStateService, ) { }
  
  ngOnInit(): void {
    // this.client.setActiveFlashcard({index: 0});
  }

  toggleAnswer = (v) => v === 'show' ? 'hide' : 'show';
  updateAnswer = (v) => this.client.updateIsAnswerShowing(v);
  isShowing = (v) => v === 'show' ? true : false;
  updateAnswers = (v) => this.client.updateAnswersEvent.next(v);
  setNextActiveFlashcard = (v) => this.client.setActiveFlashcard({index: v.activeIndex + 1});

}
