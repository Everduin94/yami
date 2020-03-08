
import { Component, OnInit, ElementRef, ViewChild, Input, forwardRef } from '@angular/core';

import Quill from 'quill';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillComponent),
      multi: true
    }
  ]
})
export class QuillComponent implements OnInit, ControlValueAccessor {

  toolbarOptions: any[] = [
    ['bold', 'italic', 'underline', 'strike'], 
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],       
    [{ 'align': [] }],
    ['clean']                                         
  ];



  @Input() label;

  editor: Quill;
  @ViewChild('location', {static: true}) location: ElementRef<any>;

  constructor() { }

  ngOnInit() {
    this.editor = new Quill(this.location.nativeElement,
      {
        modules: {
          toolbar: this.toolbarOptions,
        },
        theme: 'snow'
      }
    );

    this.editor.on('editor-change', (ev, ...args) => {
      this.onChange(this.editor.getContents());
      console.log(this.editor.root.innerHTML);
    })

    this.editor.on('selection-change', (ev, ...args) => {
      console.log(ev);
    })
    

  }

  insertHTML() {
    this.editor.root.innerHTML += `<p class="test"><input type="text">wooooooooooooo</p>`
    this.editor.pasteHTML(0, ``)
    this.editor.clipboard.dangerouslyPasteHTML(`<input type="text">`)
  }

  /* Reactive Form Behavior */
  onChange;
  onTouched;

  writeValue(delta: any): void {
    this.editor.setContents(delta);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }
}
