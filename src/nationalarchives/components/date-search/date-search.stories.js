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
  inline: { control: "boolean" },
  formGroupClasses: { control: "text" },
  formGroupAttributes: { control: "object" },
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
  inline,
  formGroupClasses,
  formGroupAttributes,
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
      inline,
      formGroupClasses,
      formGroupAttributes,
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
  value: "1986-09-24",
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

export const Inline = Template.bind({});
Inline.args = {
  label: "Enter a start date",
  headingLevel: 4,
  headingSize: "xs",
  id: "date5",
  name: "date5",
  inline: true,
  classes: "tna-date-search--demo",
};
