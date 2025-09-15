import TimeInput from "./template.njk";
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
  autofillTimeOfBirth: { control: "boolean" },
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
  title: "Components/Time input",
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
  autofillTimeOfBirth,
  progressive,
  classes,
  attributes,
}) =>
  TimeInput({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      value,
      error,
      autofillTimeOfBirth,
      progressive,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter a start time",
  headingLevel: 4,
  headingSize: "m",
  id: "time11",
  name: "time11",
  classes: "tna-time-input--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
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
};

export const OnlySomeFields = Template.bind({});
OnlySomeFields.args = {
  label: "Enter a start time",
  headingLevel: 4,
  headingSize: "m",
  id: "time14",
  name: "time14",
  classes: "tna-time-input--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Enter a start time",
  headingLevel: 4,
  headingSize: "m",
  id: "time15",
  name: "time15",
  hint: "The earliest time of the record",
  classes: "tna-time-input--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter a start time",
  headingLevel: 4,
  headingSize: "m",
  id: "time16",
  name: "time16",
  error: {
    text: "Time is not valid",
  },
  classes: "tna-time-input--demo",
};
