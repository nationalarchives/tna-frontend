import DateSearch from "./template.njk";
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
  value: { control: "text" },
  error: { control: "object" },
  maxWidth: { control: "boolean" },
  formItemClasses: { control: "text" },
  formItemAttributes: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Date search",
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
  maxWidth,
  formItemClasses,
  formItemAttributes,
  classes,
  attributes,
}) =>
  DateSearch({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      value,
      error,
      maxWidth,
      formItemClasses,
      formItemAttributes,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date1",
  name: "date1",
  classes: "tna-date-search--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date2",
  name: "date2",
  value: "2003-02-01",
  classes: "tna-date-search--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date3",
  name: "date3",
  hint: "The earliest date of the record",
  classes: "tna-date-search--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "m",
  id: "date4",
  name: "date4",
  error: {
    text: "Date is not valid",
  },
  classes: "tna-date-search--demo",
};
