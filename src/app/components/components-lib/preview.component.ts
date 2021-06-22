import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-preview',
  template: `
    <fa-icon
      class="icon" 
      [icon]="on ? previewOnIcon : previewOffIcon"
      (click)="toggleOn()">
    </fa-icon>
  `,
  styles: [`
    .icon {
      cursor: pointer;
      height: 100%;
      width: 100%;
      transition: all .3s;
    }

    .icon:hover {
      color: var(--primary-color);
    }


  `]
})
export class PreviewComponent implements OnInit {

  @Input() on = false;
  @Output() onChange = new EventEmitter<Boolean>();

  readonly previewOnIcon = faEye;
  readonly previewOffIcon = faEyeSlash;

  constructor() { }

  ngOnInit() {
  }

  toggleOn() {
    this.on = !this.on;
    this.onChange.emit(this.on);
  }

}
