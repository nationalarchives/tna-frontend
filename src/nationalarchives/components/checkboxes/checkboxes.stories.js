import Checkboxes from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m"] },
  name: { control: "text" },
  hint: { control: "text" },
  items: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Checkboxes",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  name,
  hint,
  items,
  classes,
  attributes,
}) =>
  Checkboxes({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      hint,
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Categories",
  headingLevel: 4,
  headingSize: "m",
  name: "categories",
  hint: "Select all that apply.",
  items: [
    {
      text: "Alpha",
      value: "alpha",
    },
    {
      text: "Beta",
      value: "beta",
    },
    {
      text: "Gamma",
      value: "gamma",
    },
  ],
  classes: "tna-checkboxes--demo",
};
