const argTypes = {
  text: { control: "text" },
  size: { control: "text" },
};

export default {
  title: "Global styles/Typography",
  argTypes,
};

const HeadingTemplate = ({ params }, level) => `<h${level} class="tna-heading${
  params.size ? ` tna-heading--${params.size}` : ""
}">
  ${params.text} (level ${level})
</h${level}>`;

const Heading1Template = ({ text, size }) =>
  HeadingTemplate({ params: { text, size } }, 1);
const Heading2Template = ({ text, size }) =>
  HeadingTemplate({ params: { text, size } }, 2);
const Heading3Template = ({ text, size }) =>
  HeadingTemplate({ params: { text, size } }, 3);

export const Heading1 = Heading1Template.bind({});
Heading1.args = {
  text: "This is a heading",
  size: "xl",
};

export const Heading2 = Heading2Template.bind({});
Heading2.args = {
  text: "This is a heading",
  size: "l",
};

export const Heading3 = Heading3Template.bind({});
Heading3.args = {
  text: "This is a heading",
  size: "m",
};
