import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void { // TODO: Use renderer
    console.log('auto focus it!')
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
  }

}
