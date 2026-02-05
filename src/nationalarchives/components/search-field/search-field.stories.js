import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Search field",
  argTypes: Object.fromEntries(
    Object.entries({
      label: { control: "text" },
      headingLevel: { control: { type: "number", min: 0, max: 6 } },
      headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      id: { control: "text" },
      name: { control: "text" },
      hint: { control: "text" },
      value: { control: "text" },
      buttonText: { control: "text" },
      formItemClasses: { control: "text" },
      formItemAttributes: { control: "object" },
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
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    label: "Catalogue search results",
    headingLevel: 1,
    headingSize: "l",
    id: "search1",
    name: "q",
    classes: "tna-search-field--demo",
  },
};

export const Predefined = {
  args: {
    label: "Catalogue search results",
    headingLevel: 1,
    headingSize: "l",
    id: "search2",
    name: "q",
    value: "badgers",
    classes: "tna-search-field--demo",
  },
};

export const WithHint = {
  args: {
    label: "Catalogue search results",
    headingLevel: 1,
    headingSize: "l",
    id: "search3",
    name: "q",
    hint: "Try searching for something interesting",
    classes: "tna-search-field--demo",
  },
};
