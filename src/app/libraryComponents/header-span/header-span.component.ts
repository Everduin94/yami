import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-span',
  templateUrl: './header-span.component.html',
  styleUrls: ['./header-span.component.css']
})
export class HeaderSpanComponent implements OnInit {

  @Input() label;
  @Input() dataCy;

  constructor() { }

  ngOnInit() {
  }

}
