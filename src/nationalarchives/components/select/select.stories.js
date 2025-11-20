import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Select",
  argTypes: Object.fromEntries(
    Object.entries({
      label: { control: "text" },
      headingLevel: { control: { type: "number", min: 0, max: 6 } },
      headingSize: {
        control: "inline-radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
      id: { control: "text" },
      name: { control: "text" },
      hint: { control: "text" },
      error: { control: "object" },
      items: { control: "object" },
      selected: { control: "text" },
      size: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      formItemClasses: { control: "text" },
      formItemAttributes: { control: "object" },
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
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    label: "Sort by",
    headingLevel: 4,
    headingSize: "m",
    id: "sort1",
    name: "sort1",
    items: [
      {
        text: "Relevance",
        value: "relevance",
      },
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Title",
        value: "title",
      },
    ],
    classes: "tna-select--demo",
  },
};

export const Preselected = {
  args: {
    label: "Sort by",
    headingLevel: 4,
    headingSize: "m",
    id: "sort2",
    name: "sort2",
    items: [
      {
        text: "Relevance",
        value: "relevance",
      },
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Title",
        value: "title",
      },
    ],
    selected: "date",
    classes: "tna-select--demo",
  },
};

export const WithHint = {
  args: {
    label: "Sort by",
    headingLevel: 4,
    headingSize: "m",
    id: "sort3",
    name: "sort3",
    hint: "Select a sort.",
    items: [
      {
        text: "Relevance",
        value: "relevance",
      },
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Title",
        value: "title",
      },
    ],
    classes: "tna-select--demo",
  },
};
