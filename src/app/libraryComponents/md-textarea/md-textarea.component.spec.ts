import { MdTextareaUtil, Token } from "./md-textarea-util";


const textStub = `Hello\nThis is a test\nThird line`

describe('MdTextareaComponent', () => {
  

  it('should create', () => {
    
    // MdTextareaUtil.insertToken(text:string, token: Token, startIndex:number, endIndex?:number )

    const actual = MdTextareaUtil.insertToken(textStub, Token.headingOne, 10);
    const expected = `Hello\n# This is a test\nThird line`;
    expect(actual).toEqual(expected);

    const actual1 = MdTextareaUtil.insertToken(textStub, Token.listItem, 10);
    const expected1 = `Hello\n- This is a test\nThird line`;
    expect(actual1).toEqual(expected1);

    const actual2 = MdTextareaUtil.insertToken(textStub, Token.headingThree, textStub.length - 1);
    const expected2 = `Hello\nThis is a test\n### Third line`;
    expect(actual2).toEqual(expected2);

    const actual3 = MdTextareaUtil.insertToken(textStub, Token.blockQuote, 0);
    const expected3 = `> Hello\nThis is a test\nThird line`;
    expect(actual3).toEqual(expected3);
  });
});
