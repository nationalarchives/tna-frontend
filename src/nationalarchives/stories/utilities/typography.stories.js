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
