import { MarkdownPostProcessor } from "./markdown-post-processor";

describe('Question Parser', () => {
  it('should return input given a matching token', () => {
    const expected = `<input type="text" class="fill-in-blank" data-cy="fib-0" id="fib-0" autocomplete="off" name="noautofill">`;
    const given = `FIBHello WorldFIB`;
    const actual = MarkdownPostProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should return input and text given matching token and not matching text', () => {
    const expected = '<input type="text" class="fill-in-blank" data-cy="fib-0" id="fib-0" autocomplete="off" name="noautofill"> This is irrelevant';
    const given = 'FIBHello WorldFIB This is irrelevant';
    const actual = MarkdownPostProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should parse the token and leave markdown alone given markdown with a token', () => {
    const expected = '# Hello World  <input type="text" class="fill-in-blank" data-cy="fib-0" id="fib-0" autocomplete="off" name="noautofill">  **This is more text**';
    const given = '# Hello World  FIBThis is my testFIB  **This is more text**';
    const actual = MarkdownPostProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should include a new-line given a new-line', () => {
    const expected = '# Hello World\n  <input type="text" class="fill-in-blank" data-cy="fib-0" id="fib-0" autocomplete="off" name="noautofill">  **This is more text**';
    const given = '# Hello World\n  FIBThis is my testFIB  **This is more text**';
    const actual = MarkdownPostProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });

  it('should handle multiple matching tokens on a single line given multiple matching tokens', () => {
    const expected = '# Hello World\n  <input type="text" class="fill-in-blank" data-cy="fib-0" id="fib-0" autocomplete="off" name="noautofill">  <input type="text" class="fill-in-blank" data-cy="fib-1" id="fib-1" autocomplete="off" name="noautofill">';
    const given = '# Hello World\n  FIBThis is my testFIB  FIBThis is more textFIB';
    const actual = MarkdownPostProcessor.questionParser(given);
    expect(actual).toEqual(expected);
  });
});

describe('Answer Parser', () => {
  it('should parse token into the match with span tags around it given a matching token', () => {
    const expected = '<input readonly type="text" data-cy="fib-answer-0" class="fill-in-blank-answer correct" value="Hello World">';
    const given = 'FIBHello WorldFIB';
    const givenAnswers = ["correct"];
    const answers = ["Hello World"]
    const actual = MarkdownPostProcessor.answerParser(given, givenAnswers, answers);
    expect(actual).toEqual(expected);
  });

  it('should parse token into the match with span tags around it given a matching token', () => {
    const expected = `<input readonly type="text" data-cy="fib-answer-0" class="fill-in-blank-answer correct" value="Hello World"> this is irrelevant <input readonly type="text" data-cy="fib-answer-1" class="fill-in-blank-answer correct" value="this {-10} !@#$%^&*() matters">`;
    const given = 'FIBHello WorldFIB this is irrelevant FIBthis {-10} !@#$%^&*() mattersFIB';
    const givenAnswers = ["correct", "correct"];
    const answers = ["Hello World", "this {-10} !@#$%^&*() matters"];
    const actual = MarkdownPostProcessor.answerParser(given, givenAnswers, answers);
    expect(actual).toEqual(expected);
  });
});
