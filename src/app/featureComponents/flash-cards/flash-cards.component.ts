import { Component, OnInit } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  markdownString = '# Welcome \n\n ## This is formatted markdown \n\n *Using markedjs and a pre-processor* \n\n ```javascript \n\nexport class $$PrototypeComponent$$ {\n\n myValue = `Angular!`; \n\n constructor() {} \n\n megaFunction(arg) { \n\n\t return `Hell yeah`; \n\n } \n\n} \n\n ```';


  cards$;

  constructor(private fs: FlashCardsService, private auth: FirebaseAuthService) { }

  ngOnInit() {
    this.cards$ = this.auth.userId$.pipe(
      switchMap(userId => this.fs.getUsersCards(userId))
    )
  }

}
