import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Compound filters",
  argTypes: Object.fromEntries(
    Object.entries({
      items: { control: "object" },
      removeAllText: { control: "text" },
      removeAllHref: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

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
        title:
          "Remove filter for Closed Or Retained Document, Open Description",
      },
    ],
    removeAllHref: "#",
    classes: "tna-filters--demo",
  },
};
