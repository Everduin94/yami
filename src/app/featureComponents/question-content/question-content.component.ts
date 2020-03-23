import { Component, OnInit, Input, ViewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements AfterViewInit {
  
  @Input() activeContent;
  inputs: any[];

  ngAfterViewInit(): void {
    // TODO: Use renderer because angular
    this.inputs = [].slice.call(document.querySelectorAll(".fill-in-blank"));
  }

}
