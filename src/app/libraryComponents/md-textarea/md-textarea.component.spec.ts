import { MdTextareaUtil, Token } from "./md-textarea-util";


const textStub = `Hello\nThis is a test\nThird line`

describe('MdTextareaComponent', () => {

  describe('Block Tokens', () => {
    it('should return # on the second line given headingOneToken and start-index on line 2', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.headingOne, 10);
      const expected = `Hello\n# This is a test\nThird line`;
      expect(actual).toEqual(expected);
    });
  
    it('should return - on the second line given lineItemToken and start-index on line 2', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.listItem, 10);
      const expected = `Hello\n- This is a test\nThird line`;
      expect(actual).toEqual(expected);
    });
  
    it('should return ### on the third line given headingThreeToken and start-index on line 3', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.headingThree, textStub.length - 1);
      const expected = `Hello\nThis is a test\n### Third line`;
      expect(actual).toEqual(expected);
    });
  
    it('should return > on the first line given blockQuoteToken and start-index on line 1', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.blockQuote, 0);
      const expected = `> Hello\nThis is a test\nThird line`;
      expect(actual).toEqual(expected);
    });
  });

  describe('Inline Tokens', () => {
    it('should return **Hello** given boldToken, start index 0, end index 5', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.bold, 0, 5);
      const expected = `**Hello**\nThis is a test\nThird line`;
      expect(actual).toEqual(expected);
    });

    it('should return *This is a test* given italicsToken, start index 6, end index 20', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.italics, 6, 20);
      const expected = `Hello\n*This is a test*\nThird line`;
      expect(actual).toEqual(expected);
    });

    it('should return ```This is a test``` with content on newline given syntaxToken, start index 6, end index 20', () => {
      const actual = MdTextareaUtil.insertToken(textStub, Token.syntax, 6, 20);
      const expected = 'Hello\n```\nThis is a test\n```\nThird line';
      expect(actual).toEqual(expected);
    });
  });
  
});
