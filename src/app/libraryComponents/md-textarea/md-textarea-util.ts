export enum Token {
    bold,
    italics,
    headingOne,
    headingTwo,
    headingThree,
    headingFour,
    listItem,
    blockQuote,
    table,
    syntax
}


export class MdTextareaUtil {

    insertToken(text:string, token: Token, startIndex:number, endIndex?:number ): string {
        return '';
    }


}