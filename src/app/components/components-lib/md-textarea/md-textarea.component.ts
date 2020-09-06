import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Token, MdTextareaUtil } from './md-textarea-util';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic';
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold';
import { faListUl } from '@fortawesome/free-solid-svg-icons/faListUl';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline';
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons/faStrikethrough';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-md-textarea',
  templateUrl: './md-textarea.component.html',
  styleUrls: ['./md-textarea.component.css']
})
export class MdTextareaComponent implements OnInit, OnDestroy {

  @Input() form;
  @Input() controlName;
  @Input() placeholder;
  @Input() disabled;
  @ViewChild('textarea', { static: true }) textarea;

  subscriptions = new Subscription();

  actions = WITH_FIB;

  readonly token = Token;

  constructor(public cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.form) return;
    if (this.form.controls.type.value === 'basic') this.actions = WITHOUT_FIB
    this.subscriptions.add(this.form.controls.type.valueChanges.subscribe(type => {
      this.actions = type === 'basic' ? WITHOUT_FIB : WITH_FIB;
    }));
  }

  applyToken(text, start, end, token) {
    const updatedValue = MdTextareaUtil.insertToken(text, token, start, end);
    this.textarea.inputElement.nativeElement.value = updatedValue; // SE
    this.form.get(this.controlName).patchValue(updatedValue); // SE
  }

  applyFocus(start) {
    if (!this.textarea) return;
    this.textarea.inputElement.nativeElement.focus();
    this.textarea.inputElement.nativeElement.setSelectionRange(start, start);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


const WITH_FIB = [
  { token: Token.syntax, icon: faCode },
  { token: Token.italics, icon: faItalic },
  { token: Token.bold, icon: faBold },
  { token: Token.listItem, icon: faListUl },
  { token: Token.blockQuote, icon: faAngleRight },
  { token: Token.underline, icon: faUnderline },
  { token: Token.strikethrough, icon: faStrikethrough },
  { token: Token.fib, icon: faPuzzlePiece, alt: "FIB" }
];

const WITHOUT_FIB = [
  { token: Token.syntax, icon: faCode },
  { token: Token.italics, icon: faItalic },
  { token: Token.bold, icon: faBold },
  { token: Token.listItem, icon: faListUl },
  { token: Token.blockQuote, icon: faAngleRight },
  { token: Token.underline, icon: faUnderline },
  { token: Token.strikethrough, icon: faStrikethrough },
];