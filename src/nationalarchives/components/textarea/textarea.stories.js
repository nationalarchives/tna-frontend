import Textarea from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m"] },
  name: { control: "text" },
  hint: { control: "text" },
  value: { control: "text" },
  error: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Textarea",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  name,
  hint,
  value,
  error,
  classes,
  attributes,
}) =>
  Textarea({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      hint,
      value,
      error,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter your feedback",
  headingLevel: 4,
  headingSize: "m",
  name: "feedback1",
  classes: "tna-textarea--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
  label: "Edit your feedback",
  headingLevel: 4,
  headingSize: "m",
  name: "feedback2",
  value: "I like this 👍🏼",
  classes: "tna-textarea--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter your feedback",
  headingLevel: 4,
  headingSize: "m",
  name: "feedback3",
  error: {
    text: "Enter some feedback",
  },
  classes: "tna-textarea--demo",
};
