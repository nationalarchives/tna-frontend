import Warning from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  body: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Warning",
  argTypes,
};

const Template = ({ heading, headingLevel, body, classes, attributes }) =>
  Warning({
    params: {
      heading,
      headingLevel,
      body,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  headingLevel: 2,
  body: "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
  classes: "tna-warning--demo",
};
