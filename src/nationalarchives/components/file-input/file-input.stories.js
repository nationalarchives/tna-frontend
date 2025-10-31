import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure("src");

export default {
  title: "Components/File input",
  argTypes: Object.fromEntries(
    Object.entries({
      label: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: {
        control: "inline-radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
      id: { control: "text" },
      name: { control: "text" },
      hint: { control: "text" },
      multiple: { control: "boolean" },
      droppable: { control: "boolean" },
      error: { control: "object" },
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
    label: "Upload a file",
    headingLevel: 4,
    headingSize: "m",
    id: "file1",
    name: "file1",
    classes: "tna-text-input--demo",
  },
};

export const WithHint = {
  args: {
    label: "Upload a file",
    headingLevel: 4,
    headingSize: "m",
    id: "file2",
    name: "file2",
    hint: "What people call you by",
    classes: "tna-text-input--demo",
  },
};

export const Error = {
  args: {
    label: "Upload a file",
    headingLevel: 4,
    headingSize: "m",
    id: "file3",
    name: "file3",
    error: {
      text: "Select a file",
    },
    classes: "tna-text-input--demo",
  },
};

export const Multiple = {
  args: {
    label: "Upload a file",
    headingLevel: 4,
    headingSize: "m",
    id: "file4",
    name: "file4",
    multiple: true,
    classes: "tna-text-input--demo",
  },
};

export const Dropable = {
  args: {
    label: "Upload a file",
    headingLevel: 4,
    headingSize: "m",
    id: "file4",
    name: "file4",
    droppable: true,
    classes: "tna-text-input--demo",
  },
};
