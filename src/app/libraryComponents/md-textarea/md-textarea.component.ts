import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-md-textarea',
  templateUrl: './md-textarea.component.html',
  styleUrls: ['./md-textarea.component.css']
})
export class MdTextareaComponent implements OnInit {

  @Input() form;
  @Input() controlName;
  @Input() label;
  @Input() disabled;
  @ViewChild('inputEl', {static: true}) inputElement;

  constructor(public cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
