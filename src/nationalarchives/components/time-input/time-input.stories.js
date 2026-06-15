import nunjucks from "nunjucks";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Time input",
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
      value: { control: "object" },
      error: { control: "object" },
      autofillTimeOfBirth: { control: "boolean" },
      progressive: { control: "boolean" },
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
  render: (params) => nunjucks.renderString(Template, { params }),
};

export const Standard = {
  args: {
    label: "Enter a start time",
    headingLevel: 4,
    headingSize: "m",
    id: "time11",
    name: "time11",
    classes: "tna-time-input--demo",
  },
};

export const Predefined = {
  args: {
    label: "Enter a start time",
    headingLevel: 4,
    headingSize: "m",
    id: "time12",
    name: "time12",
    value: {
      hour: "08",
      minute: "57",
    },
    classes: "tna-time-input--demo",
  },
};

export const OnlySomeFields = {
  args: {
    label: "Enter a start time",
    headingLevel: 4,
    headingSize: "m",
    id: "time14",
    name: "time14",
    classes: "tna-time-input--demo",
  },
};

export const WithHint = {
  args: {
    label: "Enter a start time",
    headingLevel: 4,
    headingSize: "m",
    id: "time15",
    name: "time15",
    hint: "The earliest time of the record",
    classes: "tna-time-input--demo",
  },
};

export const Error = {
  args: {
    label: "Enter a start time",
    headingLevel: 4,
    headingSize: "m",
    id: "time16",
    name: "time16",
    error: {
      text: "Time is not valid",
    },
    classes: "tna-time-input--demo",
  },
};
