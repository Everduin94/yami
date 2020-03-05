import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit {

  @Input() card;

  question;
  answer;

  constructor() { }

  ngOnInit() {
    this.question = JSON.parse(this.card.question);
    this.answer = JSON.parse(this.card.answer);
  }

}
