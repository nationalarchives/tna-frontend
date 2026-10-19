import { renderString } from "../../../../.storybook/nunjucks.js";
import { customViewports } from "../../../../.storybook/viewports";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Secondary navigation",
  argTypes: Object.fromEntries(
    Object.entries({
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      items: { control: "object" },
      noBottomBorder: { control: "boolean" },
      overflow: { control: "boolean" },
      visuallyHideHeading: { control: "boolean" },
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
  parameters: {
    viewport: {
      options: customViewports,
    },
  },
  render: (params) =>
    renderString(
      Template,
      { params },
      { containerWrapper: true, paddedVertical: true },
    ),
};

export const Default = {
  args: {
    title: "Our plans",
    headingLevel: 2,
    items: [
      {
        name: "Alpha",
        href: "#",
      },
      {
        name: "Beta",
        href: "#",
        current: true,
      },
      {
        name: "Gamma",
        href: "#",
      },
      {
        name: "Delta",
        href: "#",
      },
    ],
  },
};

export const Mobile = {
  parameters: {
    chromatic: {
      viewports: [customViewports.small.styles.width.replace(/px$/u, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
  },
  args: { ...Default.args },
};
