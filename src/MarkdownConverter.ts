export class MarkdownConverter {
  // visible text link -> visible text link
  // [visible text link](url) ->
  //  visible text link [^anchor1]
  //
  //  [^anchor1]: url or text
  // [this book](https://codigosostenible.com) and some other text and some other text line.
  // this book [^anchor1] and some other text and some other text line.
  //
  // [^anchor1]: https://codigosostenible.com
  static transform(text: string): string {
    const linkExpression = /^\[(.+?)\]\(([\w\.]+)\)$/;
    const groups = text.match(linkExpression);
    if (groups) {
      return `${groups[1]} [^anchor1]\n\n[^anchor1]: url`;
    }
    return text;
  }
}
