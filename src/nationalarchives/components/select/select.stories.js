import Select from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  name: { control: "text" },
  hint: { control: "text" },
  error: { control: "object" },
  items: { control: "object" },
  selected: { control: "text" },
  size: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
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
  hint,
  error,
  items,
  selected,
  size,
  classes,
  attributes,
}) =>
  Select({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      hint,
      error,
      items,
      selected,
      size,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Sort by",
  headingLevel: 4,
  headingSize: "m",
  name: "sort1",
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

export const Preselected = Template.bind({});
Preselected.args = {
  label: "Sort by",
  headingLevel: 4,
  headingSize: "m",
  name: "sort2",
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
  selected: "date",
  classes: "tna-select--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Sort by",
  headingLevel: 4,
  headingSize: "m",
  name: "sort3",
  hint: "Select a sort.",
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

export const Error = Template.bind({});
Error.args = {
  label: "Sort by",
  headingLevel: 4,
  headingSize: "m",
  name: "sort4",
  error: {
    text: "You must select a type",
  },
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
