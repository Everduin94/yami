import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-yami-guide',
    template: `
  
    <h1> What is Yami </h1>

    <div>
    Yami is a web application designed for creating, saving, and practicing flash-cards
    written in <a href="https://www.markdownguide.org/getting-started/" target="_blank">Markdown</a>, 
    with support for <a href="https://en.wikipedia.org/wiki/Syntax_highlighting" target="_blank">Syntax Highlighting</a>, 
    and <a href="https://en.wikipedia.org/wiki/Cloze_test" target="_blank">Fill in the Blanks (Clozes)</a>.
    </div>

    <div>
        Below is a code snippet taken from <a href="https://www.30secondsofcode.org/" target="_blank">30 Seconds of Code</a> and transformed into a practicable Yami card.
    </div>

    <div class="box-shadow" *ngIf="practiceAsyncPipe | async as pap; else loading">
        <img [src]="pap"/>
    </div>

    <div>
    Yami cards are personalized content created by the user writing Markdown. Cards can take advantage of many Markdown features
    such as loading images, syntax highlighting, formatting, and more. 
    </div>

    <div>
        Users can also create simple & straight-forward cards using minimal to 0 Markdown or without fill-in-the-blanks.
    </div>

    <div class="box-shadow" *ngIf="createAsyncPipe | async as cap; else loading">
        <img [src]="cap"/>
    </div>

    <ng-template #loading>
        <div class="mat-spinner-container">
            <mat-spinner [diameter]="30"></mat-spinner>
        </div>
    </ng-template>
  `,
   styleUrls: ['./content.css']
})
export class YamiGuideComponent {

    createAsyncPipe: Observable<string | null>;
    practiceAsyncPipe: Observable<string | null>;

    constructor(private storage: AngularFireStorage) {
        this.createAsyncPipe = this.storage.ref('new-async-pipe-manage.png').getDownloadURL();
        this.practiceAsyncPipe = this.storage.ref('new-async-pipe-practice.png').getDownloadURL();
    }

}