import DateInput from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
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
  inline: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Date input",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  id,
  name,
  hint,
  value,
  error,
  inline,
  classes,
  attributes,
}) =>
  DateInput({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      value,
      error,
      inline,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date11",
  name: "date11",
  classes: "tna-date-search--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date12",
  name: "date12",
  value: {
    day: "24",
    month: "09",
    year: "1986",
  },
  classes: "tna-date-search--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date13",
  name: "date13",
  hint: "The earliest date of the record",
  classes: "tna-date-search--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date14",
  name: "date14",
  error: {
    text: "Date is not valid",
  },
  classes: "tna-date-search--demo",
};

export const Inline = Template.bind({});
Inline.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "xs",
  id: "date15",
  name: "date15",
  inline: true,
  classes: "tna-date-search--demo",
};
