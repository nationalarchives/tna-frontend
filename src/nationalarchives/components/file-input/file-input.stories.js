import FileInput from "./template.njk";
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
  multiple: { control: "boolean" },
  droppable: { control: "boolean" },
  error: { control: "object" },
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
  title: "Components/File input",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  id,
  name,
  hint,
  multiple,
  droppable,
  error,
  formItemClasses,
  formItemAttributes,
  classes,
  attributes,
}) =>
  FileInput({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      multiple,
      droppable,
      error,
      formItemClasses,
      formItemAttributes,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Upload a file",
  headingLevel: 4,
  headingSize: "m",
  id: "file1",
  name: "file1",
  classes: "tna-text-input--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Upload a file",
  headingLevel: 4,
  headingSize: "m",
  id: "file2",
  name: "file2",
  hint: "What people call you by",
  classes: "tna-text-input--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Upload a file",
  headingLevel: 4,
  headingSize: "m",
  id: "file3",
  name: "file3",
  error: {
    text: "Select a file",
  },
  classes: "tna-text-input--demo",
};

export const Multiple = Template.bind({});
Multiple.args = {
  label: "Upload a file",
  headingLevel: 4,
  headingSize: "m",
  id: "file4",
  name: "file4",
  multiple: true,
  classes: "tna-text-input--demo",
};

export const Dropable = Template.bind({});
Dropable.args = {
  label: "Upload a file",
  headingLevel: 4,
  headingSize: "m",
  id: "file4",
  name: "file4",
  droppable: true,
  classes: "tna-text-input--demo",
};
