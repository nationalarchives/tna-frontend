import SensitiveImage from "./template.njk";
import "./_index.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  src: { control: "text" },
  alt: { control: "text" },
  warning: { control: "text" },
  action: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "text" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType
  )?.description;
});

export default {
  title: "Components/Sensitive image",
  argTypes,
};

const Template = ({ image, warning, action, classes, attributes }) => {
  return SensitiveImage({
    params: {
      image,
      warning,
      action,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  image: {
    src: "https://picsum.photos/id/237/800/600",
    alt: "A placeholder image",
    width: 800,
    height: 600,
  },
  warning: "This is a gory photo",
  action: "Show me the gory photo",
  classes: "tna-sensitive-image--demo",
};
