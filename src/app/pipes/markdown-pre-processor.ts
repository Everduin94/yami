export class MarkdownPreProcessor {
    static preParser(md: string): {parsed: string, answers: string[]} {
        let index = 0;
        const answers = [];
        const re = new RegExp(/FIB(.*?)FIB/g);
        const parsed = md.replace(re, (match, group) => {
            answers.push(group);
            return `FIB${index++}FIB`
        });

        return {parsed, answers};
    }

    static selectParser(type: string): (n, a) => {parsed: string, answers: string[]}  {
        if (type === 'guide') return (n) => n;
        else return (n) => MarkdownPreProcessor.preParser(n);
    }
}