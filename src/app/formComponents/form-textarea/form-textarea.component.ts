import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
