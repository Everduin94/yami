import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-yami-guide',
    template: `
  
    

    <h1 style="margin-bottom: 5px;"> What is Yami (Work in Progress) </h1>

    <hr style="margin-bottom: 20px; margin-top: 0px;">

    <div>
    Yami is a web application designed for creating, saving, and practicing flash-cards
    written in <em>Markdown</em>, with support for <em>syntax highlighting</em> and <em>fill-in-the-blanks</em>.
    </div>

    <div class="image-container" *ngIf="practiceAsyncPipe | async as pap">
        <img [src]="pap" style="width: 1000px; height: 600px"/>
    </div>

    <div>
    Flash-cards are personalized content created by the user writing Markdown. Cards can take advantage of many Markdown features
    such as loading images, syntax highlighting, formatting, and more. 
    </div>

    <div>
        Users can also create simple & straight-forward cards using minimal to 0 Markdown and without fill-in-the-blanks.
    </div>

    <div class="image-container" *ngIf="practiceReactCard | async as prc">
        <img [src]="prc" style="width: 1000px; height: 600px"/>
    </div>

    <div>
        Yami's Manage screen enables users to create, categorize, and save cards to practice with. 
        Users are free to name and categorize their cards in whatever way they see fit.
    </div>

    <div class="image-container" *ngIf="createReactCard | async as crc">
        <img [src]="crc" style="width: 1000px; height: 600px"/>
    </div>

    <div>
        Manage is where users write Markdown to format their card's question & answer.
        Below is a code snippet taken from 30-seconds-of-code and created as the practicable Yami card, using fill-in-the-blanks,
        we saw at the beginning of this post.
    </div>

    <div class="image-container" *ngIf="createAsyncPipe | async as cap">
        <img [src]="cap" style="width: 1000px; height: 600px"/>
    </div>



  


  `,
    styles: [`
    div { margin-bottom: 20px;}
    img { padding: 5px; border: 2px solid dodgerblue; margin-bottom: 20px;}
    `]
})
export class YamiGuideComponent {

    createAsyncPipe: Observable<string | null>;
    practiceAsyncPipe: Observable<string | null>;
    practiceReactCard: Observable<string | null>;
    createReactCard: Observable<string | null>;
    constructor(private storage: AngularFireStorage) {
        this.createAsyncPipe = this.storage.ref('create-async-pipe.png').getDownloadURL();
        this.practiceAsyncPipe = this.storage.ref('practice-async-pipe.png').getDownloadURL();
        this.practiceReactCard = this.storage.ref('practice-react-card.png').getDownloadURL();
        this.createReactCard = this.storage.ref('create-react-card.png').getDownloadURL();
    }

}