export class MarkdownPostProcessor {
    static questionParser(md: string): string {
        let index = 0;
        const re = new RegExp(/FIB(.*?)FIB/g);
        return md.replace(re, (match, group) => `<input type="text" class="fill-in-blank" data-cy="fib-${index}" id="fib-${index++}" autocomplete="off" name="noautofill">`);
    }

    static answerParser(md: string, givenAnswers: any[], knownAnswers: string[]): string {
        let index = 0;
        const re = new RegExp(/FIB(.*?)FIB/g);
        const quotes = new RegExp(/"(.*?)"/g);
        const updates = knownAnswers.map(v => v.replace(quotes, (match, group) => `&quot;${group}&quot;`));
        return md.replace(re, (match, group) => `<input readonly type="text" data-cy="fib-answer-${index}" class="fill-in-blank-answer ${givenAnswers[index]}" value="${updates[index++]}">`);
    }

    private parser(fn) { // TODO: Practice functional more
        let index = 0;
        const re = new RegExp(/FIB(.*?)FIB/g);
        return fn;
    }

    static selectParser(type: string): (n, a, k) => string {
        if (type === 'question') return (n, a) => MarkdownPostProcessor.questionParser(n);
        if (type === 'answer') return (n, a, k) => MarkdownPostProcessor.answerParser(n, a, k);
        if (type === 'guide') return (n, a) => n;
    }
}