import { Component, OnInit, Input } from '@angular/core';
import { faAtom } from '@fortawesome/free-solid-svg-icons/faAtom';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() size;
  icon=faAtom;

  constructor() { }

  ngOnInit() {
  }

}
