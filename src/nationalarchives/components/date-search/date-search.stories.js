import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure("src");

export default {
  title: "Components/Date search",
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
      value: { control: "text" },
      error: { control: "object" },
      maxWidth: { control: "boolean" },
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
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date1",
    name: "date1",
    classes: "tna-date-search--demo",
  },
};

export const Predefined = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date2",
    name: "date2",
    value: "2003-02-01",
    classes: "tna-date-search--demo",
  },
};

export const WithHint = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date3",
    name: "date3",
    hint: "The earliest date of the record",
    classes: "tna-date-search--demo",
  },
};

export const Error = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date4",
    name: "date4",
    error: {
      text: "Date is not valid",
    },
    classes: "tna-date-search--demo",
  },
};
