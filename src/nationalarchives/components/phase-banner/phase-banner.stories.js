import PhaseBanner from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  phase: {
    control: "radio",
    options: ["discovery", "alpha", "beta", "live"],
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
  title: "Work in progress/Components/Phase banner",
  argTypes,
};

const Template = ({ phase, message, classes, attributes }) => {
  return PhaseBanner({
    params: {
      phase,
      message,
      classes,
      attributes,
    },
  });
};

export const Discovery = Template.bind({});
Discovery.args = {
  phase: "discovery",
  message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
};

export const Alpha = Template.bind({});
Alpha.args = {
  phase: "alpha",
  message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
};

export const Beta = Template.bind({});
Beta.args = {
  phase: "beta",
  message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
};

export const Live = Template.bind({});
Live.args = {
  phase: "live",
  message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
};

export const Unknown = Template.bind({});
Unknown.args = {
  phase: "unknown",
  message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
};
