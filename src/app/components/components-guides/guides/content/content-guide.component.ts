import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-content-guide',
  template: `
  
  <h1> Your First Flashcard </h1>

  <div>
  Click "Manage" in the top right-hand corner.
  </div>

  <div>
  This screen will handle all creation, editing, and deleting of cards, decks, and groups.
  </div>

  <div class="box-shadow" *ngIf="emptyManageScreen | async as ems; else loading">
        <img [src]="ems"/>
  </div>

  <div>
  All <strong>flashcards</strong> belong to a <strong>deck</strong>. A deck is a collection of flashcards.
  </div>

  <div>
  You can select an existing deck via the Deck dropdown. Or you can add a new deck by clicking the plus icon.
  </div>

  <div>
  Each deck may optionally have a <strong>group</strong> to organize multiple decks into one place 
  </div>

  <div class="inset">
    <em>
    After clicking the plus icon to add a new deck or group, once you save the flashcard, the new deck/group will be created.
    You do <strong>not</strong> have to click the back arrow or perform a separate save
    </em>
  </div>

  <div>
    All cards have a <strong>type</strong>. Yami currently has two types. Basic - Which uses a freeform
    entry of question and answer, as well as, "Fill in Blank".
</div>

<div>
Fill in the blanks are commonly known as
    "clozes". Selecting the "Fill in Blank" type allows us to use the "FIB" tag which will generate a fill-in-the-blank 
    when that card is selected on the practice screen.
</div>

  <div>
  Let's make a simple flashcard that utilizes features like markdown, fill-in-blanks, and syntax highlighting.
  We will simutaneously create a new deck and it's first flashcard.
  </div>

  <div class="box-shadow" *ngIf="populatedManageScreen | async as pm; else loading">
        <img [src]="pm"/>
  </div>

  <div>
    By clicking the "Practice Preview" check box, we can see what the final version of our card will look like in practice.
  </div>

  <div class="box-shadow" *ngIf="previewManageScreen | async as pm2; else loading">
        <img [src]="pm2"/>
  </div>


  <ng-template #loading>
    <div class="mat-spinner-container">
        <mat-spinner [diameter]="30"></mat-spinner>
    </div>
  </ng-template>
  `,
  styleUrls: ['./content.css']
})
export class ContentGuideComponent {

  profileUrl: Observable<string | null>;
  emptyManageScreen: Observable<string | null>;
  populatedManageScreen: Observable<string | null>;
  previewManageScreen: Observable<string | null>;
  constructor(private storage: AngularFireStorage) {
    this.emptyManageScreen = this.storage.ref('manage-yami.png').getDownloadURL();
    this.populatedManageScreen = this.storage.ref('manage-yami-2.png').getDownloadURL();
    this.previewManageScreen = this.storage.ref('manage-yami-3.png').getDownloadURL();
  }

}