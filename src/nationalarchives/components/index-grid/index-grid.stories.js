import IndexGrid from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  headingHref: { control: "text" },
  body: { control: "text" },
  text: { control: "text" },
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
  supertitle,
  title,
  headingLevel,
  headingSize,
  headingHref,
  body,
  text,
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
      supertitle,
      title,
      headingLevel,
      headingSize,
      headingHref,
      body,
      text,
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
  width: 800,
  height: 600,
  title: "Cat",
};

export const Standard = Template.bind({});
Standard.args = {
  title: "My dogs",
  headingLevel: 2,
  items: Array(12)
    .fill({ ...exampleItem })
    .map((item, index) => {
      const pseudoRandom = ((index * 29) % 8) + 1;
      return {
        ...item,
        href: `#/category-${index}`,
        label: "Time period",
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

export const Basic = Template.bind({});
Basic.parameters = {
  chromatic: { disableSnapshot: true },
};
Basic.args = {
  title: "My dogs",
  items: Array(6)
    .fill({ ...exampleItem })
    .map((item, index) => {
      return {
        ...item,
        href: `#/category-${index}`,
        title: `Category #${index + 101}`,
      };
    }),
  columns: 3,
  columnsMedium: 3,
  columnsSmall: 2,
  columnsTiny: 1,
  classes: "tna-index-grid--demo",
};
