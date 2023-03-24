type FootnoteRelation = {
  text: string,
  url:string
};
interface footnoteRelations {
  [key: string]: FootnoteRelation
}
export class MarkdownConverter {

  static transform(text: string): string {
    const linkExpression = /^\[(.+?)\]\(([\w\.]+)\)$/g;
    const links = text.match(linkExpression);
    if (links) {
      const footnoteRelations: footnoteRelations = {};
      links.forEach((link, index) => {
        const textOpening = "[";
        const textClosing = "](";
        const linkText = link.substring(link.indexOf(textOpening) + 1, link.indexOf(textClosing));
        const urlOpening = "](";
        const urlClosing = ")";
        const linkUrl = link.substring(link.indexOf(urlOpening) + 2, link.indexOf(urlClosing));

        footnoteRelations[`[^anchor${index + 1}]`] = {
          text: linkText,
          url: linkUrl
        };
      })
      let outputContent = text;
      console.log(footnoteRelations);
      Object.keys(footnoteRelations).forEach((footnoteKey) => {
        outputContent = outputContent.replaceAll(
          `[${footnoteRelations[footnoteKey].text}](${footnoteRelations[footnoteKey].url})`,
          `${footnoteRelations[footnoteKey].text} ${footnoteKey}`
        );
      });
      let footnotes = "\n\n"
      Object.keys(footnoteRelations).forEach((footnoteKey) => {
        footnotes += `${footnoteKey}: ${footnoteRelations[footnoteKey].url}`;
      });

      return outputContent + footnotes;
    }
    return text;
  }
}
