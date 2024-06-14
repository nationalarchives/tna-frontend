import Sidebar from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  items: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Sidebar",
  argTypes,
};

const Template = ({ heading, headingLevel, items, classes, attributes }) =>
  Sidebar({
    params: {
      heading,
      headingLevel,
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  heading: "On this page",
  headingLevel: 2,
  items: [],
  classes: "tna-warning--demo",
};
