import { Component, OnInit, Input } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  activeAnswer = null; // TODO: Find a way to refactor out

  constructor(public cs: ContentStateService) { }

  ngOnInit() {
    
  }

}
