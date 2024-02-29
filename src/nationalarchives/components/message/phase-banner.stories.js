import Message from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  message: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Message",
  argTypes,
};

const Template = ({ message, headingLevel, classes, attributes }) =>
  Message({
    params: {
      message,
      headingLevel,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  message:
    "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
  headingLevel: 2,
  classes: "tna-phase-banner--demo",
};
