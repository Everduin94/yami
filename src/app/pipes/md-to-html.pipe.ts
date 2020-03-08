import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import * as DOMPurify from 'dompurify';
import { MarkdownPreProcessor } from './markdown-pre-processor';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args?: any): any {

    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function(code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        const highlights = hljs.highlight(validLanguage, code).value;
        console.log(highlights)
        return highlights;
      }
    });
    // const purifiedString = DOMPurify.sanitize(value);
    return this.sanitizer.bypassSecurityTrustHtml(MarkdownPreProcessor.questionParser(marked(value)));
  }

}
