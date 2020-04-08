export class MarkdownPreProcessor {
    static questionParser(md: string): string {
        let index = 0;
        const re = new RegExp(/FIB(.*?)FIB/g);
        return md.replace(re, (match, group) => `<input type="text" class="fill-in-blank" data-cy="fib-${index}" id="fib-${index++}" autocomplete="off">`);
    }

    static answerParser(md: string, givenAnswers: any[]): string {
        let index = 0;
        const re = new RegExp(/FIB(.*?)FIB/g);
        return md.replace(re, (match, group) => `<input readonly type="text" data-cy="fib-answer-${index}" class="fill-in-blank-answer ${givenAnswers[index++]}" value="${group}">`);
    }

    private parser(fn) { // TODO: Practice functional more
        let index = 0;
        const re = new RegExp(/FIB(.*?)FIB/g);
        return fn;
    }

    static shouldUseQuestionParser(answers): boolean {
        return !answers;
    }

    static selectParser(type: string): (n, a) => string {
        if (type === 'question') return (n, a) => MarkdownPreProcessor.questionParser(n);
        if (type === 'answer') return (n, a) => MarkdownPreProcessor.answerParser(n, a);
        if (type === 'guide') return (n, a) => n;
    }
}