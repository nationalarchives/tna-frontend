import Header from "./template.njk";
import "./_index.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  strapline: { control: "text" },
  navigation: { control: "object" },
  colour: {
    control: "radio",
    options: ["black", "yellow", "pink", "orange", "green", "blue"],
  },
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

const Template = ({ strapline, navigation, colour, classes, attributes }) => {
  return Header({
    params: {
      strapline,
      navigation,
      colour,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  strapline: "Beta",
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
  colour: "yellow",
  classes: "tna-header--demo",
};
