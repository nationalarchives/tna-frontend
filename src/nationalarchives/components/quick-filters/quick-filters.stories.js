import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure("src");

export default {
  title: "Components/Quick filters",
  argTypes: Object.fromEntries(
    Object.entries({
      items: { control: "object" },
      stack: { control: "boolean" },
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
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    items: [
      {
        label: "All",
        href: "#?filter=all",
        selected: true,
      },
      {
        label: "Medieval (974—1485)",
        href: "#?filter=alpha",
      },
      {
        label: "Early Modern (1485—1714)",
        href: "#?filter=beta",
      },
      {
        label: "Georgians (1714—1837)",
        href: "#?filter=gamma",
      },
      {
        label: "Victorians (1837—1901)",
        href: "#?filter=delta",
      },
      {
        label: "Early 20th century (1901—1918)",
        href: "#?filter=epsilon",
      },
      {
        label: "Interwar (1918—1939)",
        href: "#?filter=zeta",
      },
      {
        label: "Second World War (1939—1945)",
        href: "#?filter=eta",
      },
      {
        label: "Postwar (1945—2000)",
        href: "#?filter=theta",
      },
    ],
    classes: "tna-quick-filters--demo",
  },
};
