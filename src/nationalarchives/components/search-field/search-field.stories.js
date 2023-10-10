import SearchField from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Search field",
  argTypes,
};

const Template = ({ classes, attributes }) =>
  SearchField({
    params: {
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  classes: "tna-search-field--demo",
};
