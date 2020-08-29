import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements OnInit {

  @Input() form;
  @Input() controlName;
  @Input() selectData;
  @Input() label;

  constructor() { }

  ngOnInit() {
  }

}
