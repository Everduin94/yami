import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.css']
})
export class FormTextInputComponent implements OnInit {

  @Input() form;
  @Input() controlName;
  @Input() label;
  @ViewChild('inputEl', {static: true}) inputElement;

  constructor() { }

  ngOnInit() {
    console.log('text input:', this.inputElement);
  }

}
