import { Component, OnInit, Input, ViewChildren, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements AfterViewInit {

  listeners = [];
  cbFn = (v) => this.initInputs.emit(v.target.value);

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
  }

  emitInputs() {
    return !document ? [] : [].slice.call(document.querySelectorAll(".fill-in-blank"));
  }

}
