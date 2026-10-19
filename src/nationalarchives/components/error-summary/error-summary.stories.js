import {
  renderInlineString,
  renderString,
  wrapHtml,
} from "../../../../.storybook/nunjucks.js";
import TextInput from "../text-input/template.njk?raw";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Error summary",
  argTypes: Object.fromEntries(
    Object.entries({
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      items: { control: "object" },
      disableAutoFocus: { control: "boolean" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  render: (params) => renderString(Template, { params }, { padded: true }),
};

export const Standard = {
  args: {
    items: [
      {
        text: "Enter your full name",
        href: "#",
      },
      {
        text: "The date of the record cannot be in the future",
        href: "#",
      },
    ],
    disableAutoFocus: true,
    classes: "tna-error-summary--demo",
  },
};

const FormTemplate = ({ items }) =>
  wrapHtml(
    `${renderInlineString(Template, {
      params: {
        items: Array(items)
          .fill("")
          .map((item, index) => ({
            text: `Error on field ${index + 1}`,
            href: `#input-${index + 1}`,
          })),
        disableAutoFocus: true,
        classes: "tna-error-summary--demo",
      },
    })}${Array(items)
      .fill("")
      .map((item, index) =>
        renderInlineString(TextInput, {
          params: {
            label: `Field ${index + 1}`,
            id: `input-${index + 1}`,
            name: `input-${index + 1}`,
            error: {
              text: "There is a problem",
            },
          },
        }),
      )
      .join("")}`, { padded: true },
  );

export const ScrollExample = FormTemplate.bind({});
ScrollExample.args = {
  items: 24,
};
