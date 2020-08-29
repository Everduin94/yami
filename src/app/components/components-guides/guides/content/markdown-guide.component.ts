import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-markdown-guide',
  template: `
  
  <h1> What is Markdown </h1>

  <div><a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">Cheat Sheet</a></div>

  <div>Markdown is a relatively simple language. You can write markdown directly in questions or answers. -- Alternatively you can use the buttons provided.</div>
  
  <div>Markdown renders to a formatted version when on the practice screen and when "practice preview" is enabled on the mangage screen.</div>
  <div class="box-shadow center" *ngIf="preRender | async as pre; else loading">
        <img [src]="pre"/>
  </div>
  <div class="box-shadow center" *ngIf="postRender | async as post; else loading">
        <img [src]="post"/>
  </div>
  <div>Even without rendering, Markdown can provide consistent and meaningful formatting to your text. For Example:</div>
  <div class="inset">
    <div># Title</div>
    <div>## Sub Title</div>
    <div>- list</div>
    <div>- of</div>
    <div>- items</div>
  </div>

  <div>Markdown can also render HTML. If some functionality isn't available try using HTML.</div>

  <div class="inset"><strong>Important:</strong> FIB (Fill in Blank) is exclusive to Yami, and is not actual Markdown</div>
  
  <strong>Security Note</strong>
  <ul>
    <li>An input that can accept freeform HTML into an input can be dangerous</li>
    <li>Yami takes preventative measures to make this safe</li>
    <li>All input is sanitized before being saved to the database.</li>
    <li>Users are limited to accessing only their information on the client and server.
  So if malicious code was saved to the database by User A, User B would not be able to access it
  by accident or intentionally.</li>
  </ul>
  
  <ng-template #loading>
    <div class="mat-spinner-container">
        <mat-spinner [diameter]="30"></mat-spinner>
    </div>
  </ng-template>
  `,
  styleUrls: ['./content.css']
})
export class MarkdownGuideComponent {

  preRender: Observable<string | null>;
  postRender: Observable<string | null>;
  constructor(private storage: AngularFireStorage) {
    this.preRender = this.storage.ref('data-model-pre.png').getDownloadURL();
    this.postRender = this.storage.ref('model-post.png').getDownloadURL();
  }
  
}