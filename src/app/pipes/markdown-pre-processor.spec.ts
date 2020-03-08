import { MarkdownPreProcessor } from "./markdown-pre-processor";

describe('Question Parser', () => {
  it('should return input given a matching token', () => {
    const expected = `<input type="text" class="fill-in-blank">`;
    const given = `$$Hello World$$`;
    const actual = MarkdownPreProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should return input and text given matching token and not matching text', () => {
    const expected = '<input type="text" class="fill-in-blank"> This is irrelevant';
    const given = '$$Hello World$$ This is irrelevant';
    const actual = MarkdownPreProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should parse the token and leave markdown alone given markdown with a token', () => {
    const expected = '# Hello World  <input type="text" class="fill-in-blank">  **This is more text**';
    const given = '# Hello World  $$This is my test$$  **This is more text**';
    const actual = MarkdownPreProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should include a new-line given a new-line', () => {
    const expected = '# Hello World\n  <input type="text" class="fill-in-blank">  **This is more text**';
    const given = '# Hello World\n  $$This is my test$$  **This is more text**';
    const actual = MarkdownPreProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should handle multiple matching tokens on a single line given multiple matching tokens', () => {
    const expected = '# Hello World\n  <input type="text" class="fill-in-blank">  <input type="text" class="fill-in-blank">';
    const given = '# Hello World\n  $$This is my test$$  $$This is more text$$';
    const actual = MarkdownPreProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });
});

describe('Answer Parser', () => {
  it('should parse token into the match with span tags around it given a matching token', () => {
    const expected = '<span class="answer">Hello World</span>';
    const given = '$$Hello World$$';
    const actual = MarkdownPreProcessor.answerParser(given);
    expect(actual).toEqual(expected);
  });

  it('should parse token into the match with span tags around it given a matching token', () => {
    const expected = '<span class="answer">Hello World</span> this is irrelevant <span class="answer">this {-10} !@#$%^&*() matters</span>';
    const given = '$$Hello World$$ this is irrelevant $$this {-10} !@#$%^&*() matters$$';
    const actual = MarkdownPreProcessor.answerParser(given);
    expect(actual).toEqual(expected);
  });
});
