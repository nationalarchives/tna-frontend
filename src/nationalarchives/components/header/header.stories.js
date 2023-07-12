import Header from "./template.njk";
import "./_index.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  navigation: { control: "object" },
  colour: { control: "radio", options: ["black", "yellow"] },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Header",
  argTypes,
};

const Template = ({ navigation, colour, classes, attributes }) => {
  return Header({
    params: {
      navigation,
      colour,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  navigation: [
    {
      text: "Alpha",
      href: "#/alpha",
      selected: true,
    },
    {
      text: "Beta",
      href: "#/beta",
    },
    {
      text: "Gamma",
      href: "#/gamma",
    },
  ],
  classes: "tna-header--demo",
};
