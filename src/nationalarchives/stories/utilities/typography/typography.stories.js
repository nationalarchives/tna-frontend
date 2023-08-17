const argTypes = {
  text: { control: "text" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const ParagraphTemplate = ({ text }) => `<p class="tna-p">${text}</p>`;
export const Paragraph = ParagraphTemplate.bind({});
Paragraph.args = {
  text: "This is some body text",
};

const BlockquoteTemplate = ({
  html,
  author,
}) => `<blockquote class="tna-blockquote">
  <div class="tna-blockquote__quote">
    ${html}
  </div>
  <p class="tna-blockquote__author">${author}</p>
</p>`;
export const Blockquote = BlockquoteTemplate.bind({});
Blockquote.args = {
  html: "<p>A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.</p>",
  author: "Douglas Adams, Mostly Harmless",
};
