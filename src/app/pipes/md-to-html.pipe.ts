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

  transform(value: any, givenAnswers?: any): any {
    // TODO: Select parser by type
    let parser = MarkdownPreProcessor.shouldUseQuestionParser(givenAnswers) ?
    (n) => MarkdownPreProcessor.questionParser(n) :
    (n) => MarkdownPreProcessor.answerParser(n, givenAnswers);

    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: function(code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        const highlights = hljs.highlight(validLanguage, code).value;
        return highlights;
      }
    });

    return this.sanitizer.bypassSecurityTrustHtml((DOMPurify.sanitize(parser(marked(value)))));
  }

}
