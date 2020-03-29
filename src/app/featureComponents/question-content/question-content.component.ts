import { Component, OnInit, Input, ViewChildren, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements AfterViewInit {

  _activeContent;
  @Input() set activeContent(value) {
    this._activeContent = value;
    setTimeout(() => this.emitInputs(), 0); // TODO: Ugh fix this
  }
  get activeContent() { return this._activeContent; }

  @Output() initInputs = new EventEmitter();

  ngAfterViewInit(): void {
  }

  emitInputs() {
    if (!document) return [];
    this.initInputs.emit([].slice.call(document.querySelectorAll(".fill-in-blank")));
  }

}
