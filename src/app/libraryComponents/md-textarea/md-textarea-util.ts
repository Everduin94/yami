export enum Token {
    bold = '**',
    italics = '*',
    headingOne = '#',
    headingTwo = '##',
    headingThree = '###',
    headingFour = '####',
    listItem = '-',
    blockQuote = '>',
    table = 'table',
    syntax = '```',
    strikethrough = '~~',
    underline = '<ins>',
    fib = 'FIB'
}


export class MdTextareaUtil {

    static getLineNumber(text:string, startIndex:number): number {
        return text.substr(0, startIndex).split('\n').length;
    }

    public static insertToken(text:string, token: Token, startIndex:number, endIndex?:number ): string {
        
        switch (token) {
            case Token.headingOne:
            case Token.headingTwo:
            case Token.headingThree:
            case Token.headingFour:
            case Token.listItem:
            case Token.blockQuote:
                const lines = text.split('\n');
                const currentLineNumber = this.getLineNumber(text, startIndex);
                lines[currentLineNumber - 1] = `${token} ${lines[currentLineNumber - 1]}`;
                return lines.join('\n');
            case Token.bold:
            case Token.italics:
            case Token.strikethrough: // TODO: Refactor: updatedPortion takes x and returns string
                const portion = text.substring(startIndex, endIndex);
                const updatedPortion = token + portion + token;
                return text.substr(0, startIndex) + updatedPortion + text.substring(endIndex);
            case Token.fib: // FIB should have spacing
                const fibPortion = text.substring(startIndex, endIndex);
                const updatedfibPortion = `${token} ${fibPortion} ${token}`;
                return text.substr(0, startIndex) + updatedfibPortion + text.substring(endIndex);
            case Token.syntax:
                const blockPortion = text.substring(startIndex, endIndex);
                const updatedBlockPortion = `${token}\n${blockPortion}\n${token}`;
                return text.substr(0, startIndex) + updatedBlockPortion + text.substring(endIndex);
            case Token.underline:
                const underlinePortion = text.substring(startIndex, endIndex);
                const updatedUnderlinePortion = `<ins>${underlinePortion}</ins>`;
                return text.substr(0, startIndex) + updatedUnderlinePortion + text.substring(endIndex);
        }

        return text;
    }


}