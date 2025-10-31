import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Date input",
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
      fields: { control: "object" },
      value: { control: "object" },
      error: { control: "object" },
      autofillDateOfBirth: { control: "boolean" },
      progressive: { control: "boolean" },
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
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date11",
    name: "date11",
    classes: "tna-date-input--demo",
  },
};

export const Predefined = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date12",
    name: "date12",
    value: {
      day: "01",
      month: "02",
      year: "2003",
    },
    classes: "tna-date-input--demo",
  },
};

export const Progressive = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date13",
    name: "date13",
    value: {
      year: "2003",
    },
    progressive: true,
    classes: "tna-date-input--demo",
  },
};

export const OnlySomeFields = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date14",
    name: "date14",
    fields: ["m", "y"],
    classes: "tna-date-input--demo",
  },
};

export const WithHint = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date15",
    name: "date15",
    hint: "The earliest date of the record",
    classes: "tna-date-input--demo",
  },
};

export const Error = {
  args: {
    label: "Enter a start date",
    headingLevel: 4,
    headingSize: "m",
    id: "date16",
    name: "date16",
    error: {
      text: "Date is not valid",
    },
    classes: "tna-date-input--demo",
  },
};
