export enum Token {
    bold = 'bold',
    italics = 'italics',
    headingOne = '#',
    headingTwo = '##',
    headingThree = '###',
    headingFour = '####',
    listItem = '-',
    blockQuote = '>',
    table = 'table',
    syntax = 'syntax'
}


export class MdTextareaUtil {

    static getLineNumber(text:string, startIndex:number): number {
        return text.substr(0, startIndex).split('\n').length;
    }

    public static insertToken(text:string, token: Token, startIndex:number, endIndex?:number ): string {
        const currentLineNumber = this.getLineNumber(text, startIndex);
        const lines = text.split('\n');

        switch (token) {
            case Token.headingOne:
            case Token.headingTwo:
            case Token.headingThree:
            case Token.headingFour:
            case Token.listItem:
            case Token.blockQuote:
                lines[currentLineNumber - 1] = `${token} ${lines[currentLineNumber - 1]}`;
        }

        return lines.join('\n');
    }


}