import SearchResult from "./template.njk";
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
  title: "Components/Search result",
  argTypes,
};

const Template = ({ classes, attributes }) =>
  SearchResult({
    params: {
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  classes: "tna-search-result--demo",
};
