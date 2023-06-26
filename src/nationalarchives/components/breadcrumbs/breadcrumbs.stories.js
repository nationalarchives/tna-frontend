import Breadcrumbs from "./template.njk";
import "./_index.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  items: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType
  )?.description;
});

export default {
  title: "Components/Breadcrumbs",
  argTypes,
};

const Template = ({ items, classes, attributes }) => {
  return Breadcrumbs({
    params: {
      items,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  items: [
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
    {
      text: "Delta",
      href: "#/delta",
    },
    {
      text: "Epsilon",
      href: "#/epsilon",
    },
  ],
  classes: "tna-breadcrumbs--demo",
};
