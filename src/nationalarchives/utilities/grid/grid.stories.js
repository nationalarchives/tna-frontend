import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure("src");

export default {
  title: "Utilities/Grid",
  argTypes: Object.fromEntries(
    Object.entries({
      columns: { control: "object" },
      maxWidth: { control: "boolean" },
      noPadding: { control: "boolean" },
      nested: { control: "boolean" },
      htmlElement: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    classes: "tna-grid--demo",
    columns: [
      {
        html: "<p>Full width</p>",
        width: "full",
      },
      {
        html: "<p>Half</p>",
        width: "1-2",
      },
      {
        html: "<p>Half</p>",
        width: "1-2",
      },
      {
        html: "<p>Third</p>",
        width: "1-3",
      },
      {
        html: "<p>Third</p>",
        width: "1-3",
      },
      {
        html: "<p>Third</p>",
        width: "1-3",
      },
      {
        html: "<p>Two thirds</p>",
        width: "2-3",
      },
      {
        html: "<p>Third</p>",
        width: "1-3",
      },
      {
        html: "<p>Third</p>",
        width: "1-3",
      },
      {
        html: "<p>Two thirds</p>",
        width: "2-3",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Half</p>",
        width: "1-2",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Half</p>",
        width: "1-2",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Quarter</p>",
        width: "1-4",
      },
      {
        html: "<p>Half</p>",
        width: "1-2",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
      {
        html: "<p>Half</p>",
        width: "1-2",
      },
      {
        html: "<p>Third</p>",
        width: "1-3",
      },
      {
        html: "<p>Sixth</p>",
        width: "1-6",
      },
    ],
  },
};

export const Responsive = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    classes: "tna-grid--demo tna-grid--demo-tall",
    columns: Array(12).fill({
      ...{
        html: "<p>Responsive</p>",
        width: "1-4",
        widthMedium: "1-3",
        widthSmall: "1-2",
        widthTiny: "full",
      },
    }),
  },
};

export const Flex = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    classes: "tna-grid--demo",
    columns: [
      {
        html: "<h1>A</h1>",
        width: "1-4",
      },
      {
        html: "<h1>B</h1>",
        flex: 1,
      },
    ],
  },
};

export const Order = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    classes: "tna-grid--demo tna-grid--demo-tall",
    columns: [
      {
        html: "<h1>A</h1>",
        width: "1-4",
        order: 1,
        orderMedium: 2,
        orderSmall: 3,
        orderTiny: 4,
      },
      {
        html: "<h1>B</h1>",
        width: "1-4",
        order: 2,
        orderMedium: 1,
        orderSmall: 4,
        orderTiny: 3,
      },
      {
        html: "<h1>C</h1>",
        width: "1-4",
        order: 3,
        orderMedium: 4,
        orderSmall: 1,
        orderTiny: 2,
      },
      {
        html: "<h1>D</h1>",
        width: "1-4",
        order: 4,
        orderMedium: 3,
        orderSmall: 2,
        orderTiny: 1,
      },
    ],
  },
};

export const Margin = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    classes: "tna-grid--demo",
    columns: [
      {
        html: "<h1>A</h1>",
        width: "1-4",
      },
      {
        html: "<h1>B</h1>",
        width: "1-4",
        marginLeft: "1-12",
      },
      {
        html: "<h1>C</h1>",
        width: "1-4",
        marginLeft: "1-6",
      },
    ],
  },
};
