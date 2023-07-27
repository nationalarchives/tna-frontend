import FeaturedCollection from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Work in progress/Patterns/Featured collection",
  argTypes,
};

const Template = ({ heading, classes, attributes }) => {
  return FeaturedCollection({
    params: {
      heading,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  heading: "Records from the collection",
  classes: "tna-featured-collection--demo",
};
