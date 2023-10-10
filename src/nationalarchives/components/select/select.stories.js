import Select from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m"] },
  name: { control: "text" },
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
  title: "Components/Select",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  name,
  items,
  classes,
  attributes,
}) =>
  Select({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Sort by",
  headingLevel: 4,
  headingSize: "m",
  name: "sort",
  items: [
    {
      text: "Relevance",
      value: "relevance",
    },
    {
      text: "Date",
      value: "date",
    },
    {
      text: "Title",
      value: "title",
    },
  ],
  classes: "tna-select--demo",
};
