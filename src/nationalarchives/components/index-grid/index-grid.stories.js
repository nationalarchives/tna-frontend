import IndexGrid from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "object" },
  items: { control: "object" },
  columns: { control: "number" },
  columnsMedium: { control: "number" },
  columnsSmall: { control: "number" },
  columnsTiny: { control: "number" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Index grid",
  argTypes,
};

const Template = ({
  heading,
  items,
  columns,
  columnsMedium,
  columnsSmall,
  columnsTiny,
  classes,
  attributes,
}) =>
  IndexGrid({
    params: {
      heading,
      items,
      columns,
      columnsMedium,
      columnsSmall,
      columnsTiny,
      classes,
      attributes,
    },
  });

const exampleItem = {
  href: "#",
  src: "https://picsum.photos/id/237/800/600",
  alt: "Photo of a puppy",
  width: "800",
  height: "600",
  title: "Cat",
  subtitle: "4 photos",
};
export const Standard = Template.bind({});
Standard.args = {
  heading: {
    title: "My dogs",
    level: 2,
  },
  items: Array(12)
    .fill({ ...exampleItem })
    .map((item, index) => {
      const pseudoRandom = ((index * 29) % 8) + 1;
      return {
        ...item,
        href: `#/category-${index}`,
        title: `Category #${index + 101}`,
        subtitle: `${pseudoRandom} photos`,
      };
    }),
  columns: 4,
  columnsMedium: 3,
  columnsSmall: 2,
  columnsTiny: 1,
  classes: "tna-index-grid--demo",
};
