import Header from "./template.njk";
import "./_index.scss";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  navigation: { control: "object" },
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

const Template = ({ navigation, classes, attributes }) => {
  return Header({
    params: {
      navigation,
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
