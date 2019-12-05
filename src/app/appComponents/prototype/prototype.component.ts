import { Component, OnInit } from '@angular/core';
import { PrototypeService } from './prototype.service';
import { FlashCardsService } from 'src/app/services/flash-cards.service';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css']
})
export class PrototypeComponent implements OnInit {


  cards$;

  constructor(private ps: PrototypeService, private fs: FlashCardsService) { }

  ngOnInit() {
   this.cards$ = this.fs.getUsersCards();
  }

}
