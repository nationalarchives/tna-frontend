const argTypes = {
  text: { control: "text" },
  size: { control: "text" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const HeadingTemplate = ({ params }, level) => `<h${level} class="tna-heading-${
  params.size
}">
  ${params.text} (${params.size.toUpperCase()})
</h${level}>
`;

const HeadingsTemplate = ({ text }) =>
  `${HeadingTemplate({ params: { text, size: "xl" } }, 1)}${HeadingTemplate(
    { params: { text, size: "l" } },
    2,
  )}${HeadingTemplate({ params: { text, size: "m" } }, 3)}${HeadingTemplate(
    { params: { text, size: "s" } },
    4,
  )}`;

export const Headings = HeadingsTemplate.bind({});
Headings.parameters = {
  chromatic: { disableSnapshot: true },
};
Headings.args = {
  text: "This is a heading",
};
