import TextInput from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m"] },
  name: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Text input",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  name,
  classes,
  attributes,
}) =>
  TextInput({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter your first name",
  headingLevel: 4,
  headingSize: "m",
  name: "firstname",
  classes: "tna-text-input--demo",
};
