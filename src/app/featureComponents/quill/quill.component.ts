
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import Quill from 'quill';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css']
})
export class QuillComponent implements OnInit {

  editor;
  @ViewChild('location', {static: true}) location: ElementRef<any>;

  constructor() { }

  ngOnInit() {
    this.editor = new Quill(this.location.nativeElement);
  }

}
