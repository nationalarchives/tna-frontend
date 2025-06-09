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
  fields: { control: "boolean" },
  value: { control: "object" },
  error: { control: "object" },
  inline: { control: "boolean" },
  progressive: { control: "boolean" },
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
  fields,
  value,
  error,
  inline,
  progressive,removeFieldNameSuffixes,
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
      fields,
      value,
      error,
      inline,
      progressive,removeFieldNameSuffixes,
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
  classes: "tna-date-input--demo",
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
  classes: "tna-date-input--demo",
};

export const Progressive = Template.bind({});
Progressive.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date13",
  name: "date13",
  value: {
    year: "1986",
  },
  progressive: true,
  classes: "tna-date-input--demo",
};

export const OnlySomeFields = Template.bind({});
OnlySomeFields.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date14",
  name: "date14",
  fields: ["month", "year"],
  classes: "tna-date-input--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date15",
  name: "date15",
  hint: "The earliest date of the record",
  classes: "tna-date-input--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date16",
  name: "date16",
  error: {
    text: "Date is not valid",
  },
  classes: "tna-date-input--demo",
};

export const Inline = Template.bind({});
Inline.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "xs",
  id: "date17",
  name: "date17",
  inline: true,
  classes: "tna-date-input--demo",
};
