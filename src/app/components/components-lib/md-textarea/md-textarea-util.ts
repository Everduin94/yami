import { ElementRef } from "@angular/core";

export enum Token {
  bold = "**",
  italics = "*",
  headingOne = "#",
  headingTwo = "##",
  headingThree = "###",
  headingFour = "####",
  listItem = "-",
  blockQuote = ">",
  table = "table",
  syntax = "```",
  strikethrough = "~~",
  underline = "<ins>",
  fib = "FIB",
  img = "![desc](img)",
  link = "[desc](link)",
}

export class MdTextareaUtil {
  public static getLineNumber(text: string, startIndex: number): number {
    return text.substr(0, startIndex).split("\n").length;
  }

  public static getLineText(lines: string[], lineNumber: number): string {
    return lines[lineNumber - 1];
  }

  public static easyEdit(el: ElementRef) {}

  public static insertToken(
    text: string,
    token: Token,
    startIndex: number,
    endIndex?: number
  ): string {
    switch (token) {
      case Token.headingOne:
      case Token.headingTwo:
      case Token.headingThree:
      case Token.headingFour:
      case Token.blockQuote:
        const lines = text.split("\n");
        const currentLineNumber = this.getLineNumber(text, startIndex);
        lines[currentLineNumber - 1] = `${token} ${
          lines[currentLineNumber - 1]
        }`;
        return lines.join("\n");
      case Token.bold:
      case Token.italics:
      case Token.strikethrough: // TODO: Refactor: updatedPortion takes x and returns string
        const portion = text.substring(startIndex, endIndex);
        const updatedPortion = token + portion + token;
        return (
          text.substr(0, startIndex) + updatedPortion + text.substring(endIndex)
        );
      case Token.fib: // FIB should have spacing
        const fibPortion = text.substring(startIndex, endIndex);
        const updatedfibPortion = `${token} ${fibPortion} ${token}`;
        return (
          text.substr(0, startIndex) +
          updatedfibPortion +
          text.substring(endIndex)
        );
      case Token.syntax:
        const blockPortion = text.substring(startIndex, endIndex);
        const updatedBlockPortion = `${token}\n${blockPortion}\n${token}`;
        return (
          text.substr(0, startIndex) +
          updatedBlockPortion +
          text.substring(endIndex)
        );
      case Token.underline:
        const underlinePortion = text.substring(startIndex, endIndex);
        const updatedUnderlinePortion = `<ins>${underlinePortion}</ins>`;
        return (
          text.substr(0, startIndex) +
          updatedUnderlinePortion +
          text.substring(endIndex)
        );
      case Token.img:
      case Token.link:
        const highlightedText = text.substring(startIndex, endIndex);
        const bang = token === Token.img ? "!" : "";
        const modifiedText = `${bang}[description](${highlightedText})`;
        return (
          text.substr(0, startIndex) + modifiedText + text.substring(endIndex)
        );
      case Token.listItem:
        const lines2 = text.split("\n");
        const currentLineNumber2 = this.getLineNumber(text, startIndex);
        const lineText = this.getLineText(lines2, currentLineNumber2);
        const numberOfSpaces = lineText.search(/\S/);
        const startsWithDash = lineText[numberOfSpaces] === "-";
        if (startsWithDash) {
          //@ts-ignore
          const spacing = [...Array(numberOfSpaces).keys()]
            .map((v) => " ")
            .reduce((acc, curr) => acc + curr, "");
          lines2.splice(currentLineNumber2, 0, `${spacing}${token} `);
        } else {
          lines2[currentLineNumber2 - 1] = `${token} ${
            lines2[currentLineNumber2 - 1]
          }`;
        }

        return lines2.join("\n");
    }

    return text;
  }
}
