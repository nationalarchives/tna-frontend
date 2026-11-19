import { wrapHtml } from "../../../../.storybook/nunjucks.js";

const argTypes = {
  text: { control: "text" },
  link: { control: "text" },
  size: { control: "text" },
};

export default {
  title: "Utilities/Typography",
  argTypes,
};

const HeadingTemplate = ({ params }, level) => `<h${level} class="tna-heading-${
    params.size
  }">
  ${params.link ? `<a href="${params.link}">` : ""}${params.text} (${params.size.toUpperCase()})${params.link ? `</a>` : ""}
</h${level}>
`,
  HeadingsTemplate = ({ text, link }) =>
    wrapHtml(
      `${HeadingTemplate({ params: { text, link, size: "xl" } }, 1)}${HeadingTemplate(
        { params: { text, link, size: "l" } },
        2,
      )}${HeadingTemplate({ params: { text, link, size: "m" } }, 3)}${HeadingTemplate(
        { params: { text, link, size: "s" } },
        4,
      )}`,
      { padded: true },
    );

export const Headings = HeadingsTemplate.bind({});
Headings.parameters = {
  chromatic: { disableSnapshot: true },
};
Headings.args = {
  text: "This is a heading",
};
