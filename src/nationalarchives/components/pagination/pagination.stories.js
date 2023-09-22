import Pagination from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  landmarkLabel: { control: "text" },
  previous: { control: "object" },
  items: { control: "object" },
  next: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Pagination",
  argTypes,
};

const Template = ({ previous, items, next, classes, attributes }) =>
  Pagination({
    params: {
      previous,
      items,
      next,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  previous: {
    href: "#",
  },
  items: [
    {
      number: 1,
      href: "#",
    },
    {
      ellipsis: true,
    },
    {
      number: 6,
      href: "#",
    },
    {
      number: 7,
      current: true,
      href: "#",
    },
    {
      number: 8,
      href: "#",
    },
    {
      ellipsis: true,
    },
    {
      number: 42,
      href: "#",
    },
  ],
  next: {
    href: "#",
  },
  classes: "tna-pagination--demo",
};
