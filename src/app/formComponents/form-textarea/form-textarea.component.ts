import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.css']
})
export class FormTextareaComponent implements OnInit {

  @Input() form;
  @Input() controlName;
  @Input() label;
  @Input() disabled;
  @ViewChild('inputEl', {static: true}) inputElement;

  constructor() { }

  ngOnInit() {
  }

}
