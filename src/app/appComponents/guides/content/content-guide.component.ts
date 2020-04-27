import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-content-guide',
  template: `
  
  <h1> Work in Progress </h1>


  Creating your first card: To create a card navigate to the manage screen by clicking "Manage" in the top left corner of the application. Enter a title, a title is how users can summarize and identify the card. The title will be displayed on each button on the left hand side when practicing or editing existing cards.

  Create a new category. Categories allow users to organize groups of cards any way they like for when they practice. To create a new category, click the "new category" button, type a category name, and press save. Next time you want to add a card to this category, you can simply select it from the dropdown.
  
  Filling out the question and answer. Let's make a simple flash-card that has minimal use of Markdown.
  
  <ng-container *ngIf="profileUrl | async as imageSrc">
  <img [src]="imageSrc" style="border: 1px solid var(--box-shadow); width: 1000px; height: 600px;"/>
</ng-container>
  
  
  Deleting a card: To delete a card, click the "Delete Content" button in the bottom left corner. Delete will only be available when an existing card is selected and will delete that selected card. -- A confirmation dialog will be prompted after clicking delete! 

  `,
  styles: ['']
})
export class ContentGuideComponent {

    profileUrl: Observable<string | null>;
    constructor(private storage: AngularFireStorage) {
       const ref = this.storage.ref('create-react-card.png');
       this.profileUrl = ref.getDownloadURL();
    }

}