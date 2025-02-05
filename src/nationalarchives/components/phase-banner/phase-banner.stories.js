import PhaseBanner from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  phase: {
    control: "text",
  },
  message: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Phase banner",
  argTypes,
};

const Template = ({ phase, message, classes, attributes }) =>
  PhaseBanner({
    params: {
      phase,
      message,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  phase: "beta",
  message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
};
