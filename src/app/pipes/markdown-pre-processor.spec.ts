import { MarkdownPreProcessor } from "./markdown-pre-processor";

describe('Parser', () => {
    it('should return FIB0FIB given first matching token', () => {
      const expectedParsed = `FIB0FIB`;
      const expectedAnswers = [`Hello World`];
      const given = `FIBHello WorldFIB`;
      const actual = MarkdownPreProcessor.preParser(given);
      expect(actual.parsed).toEqual(expectedParsed);
      expect(actual.answers).toEqual(expectedAnswers);
    });
});  
