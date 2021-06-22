import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-span',
  templateUrl: './header-span.component.html',
  styleUrls: ['./header-span.component.css']
})
export class HeaderSpanComponent {

  @Input() label;
  @Input() dataCy;

}
