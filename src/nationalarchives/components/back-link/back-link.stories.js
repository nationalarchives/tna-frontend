import { renderString } from "../../../../.storybook/nunjucks.js";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Back link",
  argTypes: Object.fromEntries(
    Object.entries({
      text: { control: "text" },
      href: { control: "text" },
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
    text: "Back to previous page",
    href: "#",
  },
};
