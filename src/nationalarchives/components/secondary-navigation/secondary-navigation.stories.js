import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { customViewports } from "../../../../.storybook/viewports";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Secondary navigation",
  argTypes: Object.fromEntries(
    Object.entries({
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      items: { control: "object" },
      noBottomBorder: { control: "boolean" },
      overflow: { control: "boolean" },
      noUnindentation: { control: "boolean" },
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
    chromatic: { delay: 1000 },
    viewport: {
      options: customViewports,
    },
  },
  render: (params) => {
    return `<div class="tna-container">
  <div class="tna-column tna-column--full">
    ${nunjucks.renderString(Template, { params })}
  </div>
</div>`;
  },
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

export const Medium = {
  parameters: {
    chromatic: {
      viewports: [customViewports["medium"].styles.width.replace(/px$/, "")],
    },
  },
  globals: {
    viewport: { value: "medium" },
  },
  args: { ...Default.args },
};

export const Mobile = {
  parameters: {
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
  },
  args: { ...Default.args },
};
