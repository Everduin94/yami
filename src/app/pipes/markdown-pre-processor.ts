export class MarkdownPreProcessor {
    static questionParser(md: string): string {
        let re = new RegExp(/\${2}(.*?)\${2}/g);
        return md.replace(re, (match, group) => `<input type="text" class="fill-in-blank">`);
    }

    static answerParser(md: string): string {
        let re = new RegExp(/\${2}(.*?)\${2}/g);
        return md.replace(re, (match, group) => `<span class="answer">${group}</span>`);
    }
}


//\n\`{3}(.*?)\n(.*?)\n\`{3}\n