import { Component, Input, AfterViewInit, Output, EventEmitter, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollSyncDirective } from '../flash-cards/scroll-sync.directive';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements AfterViewInit {

  @ViewChild('question', {static: false}) questionEl;

  scrollTop = 0;

  subs = new Subscription();

  listeners = [];
  cbFn = (v) => this.initInputs.emit({[v.target.id]: v.target.value});

  _activeContent;
  @Input() set activeContent(value) {
    this._activeContent = value;
    this.listeners.forEach(v => v.removeEventListener('change', this.cbFn));
    setTimeout(() => {
      this.listeners = this.emitInputs();
      this.listeners.forEach(v => v.addEventListener('change', this.cbFn))
    }, 0); // TODO: Ugh
  }
  get activeContent() { return this._activeContent; }

  @Output() initInputs = new EventEmitter();

  ngAfterViewInit(): void {
    this.subs.add(this.scrollSync.scrollPosition$.subscribe(v => {
      this.scrollTop = v;
      this.cd.detectChanges();
      console.log('setting')
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  constructor(private scrollSync: ScrollSyncDirective, private cd: ChangeDetectorRef) {

  }

  emitInputs() {
    return !document ? [] : [].slice.call(document.querySelectorAll(".fill-in-blank"));
  }

  logme(event) {
    this.scrollSync.dispatch(event.target.scrollTop);
  }

}
