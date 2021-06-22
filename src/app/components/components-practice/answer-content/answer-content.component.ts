import { Component, OnInit, Input, ViewChildren, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollSyncDirective } from '../flash-cards/scroll-sync.directive';

@Component({
  selector: 'app-answer-content',
  templateUrl: './answer-content.component.html',
  styleUrls: ['./answer-content.component.css']
})
export class AnswerContentComponent implements AfterViewInit {

  @ViewChildren("fib") inputs;
  @ViewChild('answer', {static: false}) answerEl;
  @Input() activeContent;
  @Input() answers;

  scrollTop = 0;
  subs = new Subscription();

  constructor(private scrollSync: ScrollSyncDirective, private cd: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.subs.add(this.scrollSync.scrollPosition$.subscribe(v => {
      this.scrollTop = v;
      this.cd.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  logme(event) {
    this.scrollSync.dispatch(event.target.scrollTop);
  }

}
