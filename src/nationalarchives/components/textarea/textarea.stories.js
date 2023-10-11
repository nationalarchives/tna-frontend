import Textarea from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m"] },
  id: { control: "text" },
  name: { control: "text" },
  hint: { control: "text" },
  value: { control: "text" },
  error: { control: "object" },
  spellcheck: { control: "boolean" },
  size: { control: "inline-radio", options: ["s", "m", "l"] },
  rows: { control: "number" },
  classes: { control: "text" },
  formGroupClasses: { control: "text" },
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
  id,
  name,
  hint,
  value,
  error,
  spellcheck,
  size,
  rows,
  classes,
  formGroupClasses,
  attributes,
}) =>
  Textarea({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      value,
      error,
      spellcheck,
      size,
      rows,
      classes,
      formGroupClasses,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter your feedback",
  headingLevel: 4,
  headingSize: "m",
  id: "feedback1",
  name: "feedback1",
  classes: "tna-textarea--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
  label: "Edit your feedback",
  headingLevel: 4,
  headingSize: "m",
  id: "feedback2",
  name: "feedback2",
  value: "I like this 👍🏼",
  classes: "tna-textarea--demo",
};
export const WithHint = Template.bind({});
WithHint.args = {
  label: "Enter your feedback",
  headingLevel: 4,
  headingSize: "m",
  id: "feedback3",
  name: "feedback3",
  hint: "What did you think?",
  classes: "tna-textarea--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter your feedback",
  headingLevel: 4,
  headingSize: "m",
  id: "feedback4",
  name: "feedback4",
  error: {
    text: "Enter some feedback",
  },
  classes: "tna-textarea--demo",
};
