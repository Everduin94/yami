import { Component, OnInit } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  cards$;

  constructor(private fs: FlashCardsService) { }

  ngOnInit() {
    this.cards$ = this.fs.getUsersCards();
  }

}
