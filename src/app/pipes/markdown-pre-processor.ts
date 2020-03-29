export class MarkdownPreProcessor {
    static questionParser(md: string): string {
        // TODO: possibly use group instead of index i : warning security concerns
        let re = new RegExp(/FIB(.*?)FIB/g);
        let index = 0;
        return md.replace(re, (match, group) => `<input data-cy="fib-${index}" id="fib-${index++}" type="text" class="fill-in-blank">`);
    }

    static answerParser(md: string, givenAnswers: any[]): string {
        // TODO: In future, look for more performant soltuion
        let i = 0;
        let match;
        let results = {};
        let re = new RegExp(/FIB(.*?)FIB/g);
        while(match = re.exec(md)) {
            results[match[1]] = givenAnswers[i++] ? "correct" : "incorrect"; // Give results a property of group and assign to corresponding answer
        }
        
        return md.replace(re, (match, group) => `<input readonly type="text" class="fill-in-blank-answer ${results[group]}" value=${group}>`);
    }

    static shouldUseQuestionParser(answers): boolean {
        return !answers;
    }
}