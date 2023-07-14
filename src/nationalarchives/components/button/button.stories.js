import Button from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  text: { control: "text" },
  href: { control: "text" },
  title: { control: "text" },
  secondary: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Work in progress/Button",
  argTypes,
};

const Template = ({ text, href, title, secondary, classes, attributes }) => {
  return Button({
    params: {
      text,
      href,
      title,
      secondary,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  text: "Button",
  href: "#",
  classes: "tna-button--demo",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Button",
  href: "#",
  secondary: true,
  classes: "tna-button--demo",
};
