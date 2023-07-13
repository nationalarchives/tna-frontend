import Header from "./template.njk";
import "./_index.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  logo: { control: "object" },
  navigation: { control: "object" },
  colour: {
    control: "radio",
    options: ["black", "yellow", "pink", "orange", "green", "blue"],
  },
  exit: { control: "object" },
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

const Template = ({ logo, navigation, colour, exit, classes, attributes }) => {
  return Header({
    params: {
      logo,
      navigation,
      colour,
      exit,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  logo: {
    strapline: "Beta",
    href: "#/",
  },
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
  exit: {
    text: "Go to the current National Archives website",
    href: "#",
    target: "_blank",
  },
  classes: "tna-header--demo",
};
