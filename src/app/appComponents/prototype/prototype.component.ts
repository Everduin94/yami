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


  markdownString = '# Welcome \n &lt;script&gt;alert("Hello World!");&lt;/script&gt; \n\n ## This is formatted markdown \n\n *Using markedjs and a pre-processor* \n\n ```\n\nexport class $$PrototypeComponent$$ {\n\n constructor() \n\n} \n\n &lt;div class="hi"&gt; test me &lt;/div&gt;```';

  constructor(private ps: PrototypeService, private fs: FlashCardsService) { }

  ngOnInit() {
  //  this.cards$ = this.fs.getUsersCards();
  }

}
