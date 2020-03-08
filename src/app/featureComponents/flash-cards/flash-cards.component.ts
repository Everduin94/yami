import { Component, OnInit, Input } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  activeContent;
  activeAnswer;

  markdownString = '# Welcome \n\n ## This is formatted markdown \n\n *Using markedjs and a pre-processor* \n\n ```javascript \n\nexport class $$PrototypeComponent$$ {\n\n myValue = `Angular!`; \n\n constructor() {} \n\n megaFunction(arg) { \n\n\t return `Hell yeah`; \n\n } \n\n} \n\n ```';

  constructor(private fs: FlashCardsService, private auth: FirebaseAuthService) { }

  ngOnInit() {
    
  }

}
