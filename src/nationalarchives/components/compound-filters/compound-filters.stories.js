import Filters from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  items: { control: "object" },
  removeAllText: { control: "text" },
  removeAllHref: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Compound filters",
  argTypes,
};

const Template = ({
  items,
  removeAllText,
  removeAllHref,
  classes,
  attributes,
}) =>
  Filters({
    params: {
      items,
      removeAllText,
      removeAllHref,
      classes,
      attributes,
    },
  });

export const Standard = {
  args: {
    items: [
      {
        label: "AIR - Air Ministry and Royal Air Force records",
        href: "#",
        title: "Remove Air Ministry and Royal Air Force records filter",
      },
      {
        label: "Item",
        href: "#",
        title: "Remove item filter",
      },
      {
        label: "Closed Or Retained Document, Open Description",
        href: "#",
        title: "Remove filter for Closed Or Retained Document, Open Description",
      },
    ],
    removeAllHref: "#",
    classes: "tna-filters--demo",
  },
};
