import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import * as DOMPurify from 'dompurify';
import { MarkdownPostProcessor } from './markdown-post-processor';
import { MarkdownPreProcessor } from './markdown-pre-processor';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, type:string, givenAnswers?: any): any {

    let preParser = MarkdownPreProcessor.selectParser(type);
    let parser = MarkdownPostProcessor.selectParser(type);

    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function(code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        const highlights = hljs.highlight(validLanguage, code).value;
        return highlights;
      },
    });

    const { parsed, answers } = preParser(value, givenAnswers) // TODO: I don't think i need given answers here.
    const html = DOMPurify.sanitize(parser(marked(parsed), givenAnswers, answers));

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
