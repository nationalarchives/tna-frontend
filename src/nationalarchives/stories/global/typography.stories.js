const argTypes = {
  text: { control: "text" },
};

export default {
  title: "Global styles/Typography",
  argTypes,
};

const BodyFontTemplate = ({ text }) => `<p>${text}</p>`;

export const BodyFont = BodyFontTemplate.bind({});
BodyFont.args = {
  text: "This is some body text",
};
