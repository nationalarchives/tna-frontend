import Profile from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Profile",
  argTypes,
};

const Template = ({ classes, attributes }) => {
  return Profile({
    params: {
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  classes: "tna-profile--demo",
};
