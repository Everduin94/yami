import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit {

  @Input() card;

  constructor() { }

  ngOnInit() {
  }

}
