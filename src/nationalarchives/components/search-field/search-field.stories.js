import SearchField from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  id: { control: "text" },
  name: { control: "text" },
  hint: { control: "text" },
  value: { control: "text" },
  formItemClasses: { control: "text" },
  formItemAttributes: { control: "object" },
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

const Template = ({
  label,
  headingLevel,
  headingSize,
  id,
  name,
  hint,
  value,
  formItemClasses,
  formItemAttributes,
  classes,
  attributes,
}) =>
  SearchField({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      value,
      formItemClasses,
      formItemAttributes,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Catalogue search results",
  headingLevel: 1,
  headingSize: "l",
  id: "search1",
  name: "q",
  classes: "tna-search-field--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
  label: "Catalogue search results",
  headingLevel: 1,
  headingSize: "l",
  id: "search2",
  name: "q",
  value: "badgers",
  classes: "tna-search-field--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Catalogue search results",
  headingLevel: 1,
  headingSize: "l",
  id: "search3",
  name: "q",
  hint: "Try searching for something interesting",
  classes: "tna-search-field--demo",
};
