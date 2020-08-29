import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box-route-link',
  templateUrl: './box-route-link.component.html',
  styleUrls: ['./box-route-link.component.css']
})
export class BoxRouteLinkComponent implements OnInit {

  @Input() link = `['/add']`;

  constructor() { }

  ngOnInit() {
  }

}
