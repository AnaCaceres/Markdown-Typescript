import { MarkdownConverter } from "../src/MarkdownConverter";

/*
"" -> ""
"text" -> "text"
"[text link](url)" -> "text link [^anchor1]\n\n[^anchor1]: url"
"irrelevant [text link](url)" -> "irrelevant text link [^anchor1]\n\n[^anchor1]: url"
"[text link](url) irrelevant" -> "text link [^anchor1] irrelevant\n\n[^anchor1]: url"
"irrelevant [text link](url) irrelevant" -> "irrelevant text link [^anchor1] irrelevant\n\n[^anchor1]: url"
"[text link](url) [text link2](url2)" -> "text link [^anchor1] text link2 [^anchor2]\n\n[^anchor1]: url\n\n[^anchor2]: url2"
"[text link](url) irrelevant [text link2](url)" -> "text link [^anchor1] irrelevant text link2 [^anchor1]\n\n[^anchor1]: url"
 */


describe("Markdown converter should", () => {
  it("keep format if there are no links", () => {
    const text = "visible text link";

    expect(MarkdownConverter.transform(text)).toBe(text);
  });

  it("format links as references", () => {
    const text = "[visible text link](url)";
    const expectedFormattedText =
      "visible text link [^anchor1]\n\n[^anchor1]: url";

    expect(MarkdownConverter.transform(text)).toBe(expectedFormattedText);
  });
});


