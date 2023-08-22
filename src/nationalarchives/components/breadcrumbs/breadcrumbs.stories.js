import Breadcrumbs from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  items: { control: "object" },
  noCollapse: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Breadcrumbs",
  argTypes,
};

const Template = ({ items, noCollapse, classes, attributes }) =>
  Breadcrumbs({
    params: {
      items,
      noCollapse,
      classes,
      attributes,
    },
  });

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

export const NoCollapse = Template.bind({});
NoCollapse.args = {
  ...Standard.args,
  noCollapse: true,
};
