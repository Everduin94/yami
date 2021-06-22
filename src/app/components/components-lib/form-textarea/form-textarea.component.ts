import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MdTextareaUtil } from '../md-textarea/md-textarea-util';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.css']
})
export class FormTextareaComponent implements OnInit {

  @Input() form;
  @Input() controlName;
  @Input() placeholder;
  @Input() disabled;
  @Output() enterEvent = new EventEmitter();
  @ViewChild('inputEl', {static: true}) inputElement;

  constructor() { }

  ngOnInit() {
  }

  easyEdit(event) {
    this.enterEvent.emit(event);
  }
}
