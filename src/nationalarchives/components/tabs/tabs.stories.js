import Tabs from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  items: { control: "array" },
  sticky: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Experimental/Tabs",
  argTypes,
};

const Template = ({ title, items, sticky, classes, attributes }) => {
  return Tabs({
    params: {
      title,
      items,
      sticky,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  title: "Example tabs",
  items: [
    {
      id: "unique-id-a",
      title: "Alpha section",
      html: "<h2>Alpha</h2><p>Lorem ipsum</p>",
    },
    {
      id: "unique-id-b",
      title: "Beta (the other one)",
      html: "<h2>Beta</h2><p>Lorem ipsum</p>",
    },
    {
      id: "unique-id-c",
      title: "Gamma",
      html: "<h2>Gamma</h2><p>Lorem ipsum</p>",
    },
  ],
  classes: "tna-tabs--demo",
};
