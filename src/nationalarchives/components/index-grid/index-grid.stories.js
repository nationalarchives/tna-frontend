import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Index grid",
  argTypes: Object.fromEntries(
    Object.entries({
      supertitle: { control: "text" },
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      href: { control: "text" },
      hrefClasses: { control: "text" },
      hrefAttributes: { control: "object" },
      body: { control: "text" },
      text: { control: "text" },
      items: { control: "object" },
      lazyImages: { control: "boolean" },
      columns: { control: "number" },
      columnsMedium: { control: "number" },
      columnsSmall: { control: "number" },
      columnsTiny: { control: "number" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

const exampleItem = {
  href: "#",
  src: "https://picsum.photos/id/237/800/600",
  alt: "Photo of a puppy",
  width: 800,
  height: 600,
  title: "Cat",
};

export const Standard = {
  args: {
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
  },
};

export const Basic = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
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
  },
};
