import { Component, OnInit } from '@angular/core';
import { FlashCardsService } from 'src/app/services/flash-cards.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  cards$;

  constructor(private fs: FlashCardsService, private auth: FirebaseAuthService) { }

  ngOnInit() {
    this.cards$ = this.auth.userId$.pipe(
      switchMap(userId => this.fs.getUsersCards(userId))
    )
  }

}
