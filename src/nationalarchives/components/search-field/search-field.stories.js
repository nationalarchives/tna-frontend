import SearchField from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

const argTypes = Object.fromEntries(
  Object.entries({
    label: { control: "text" },
    headingLevel: { control: { type: "number", min: 1, max: 6 } },
    headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
    id: { control: "text" },
    name: { control: "text" },
    hint: { control: "text" },
    value: { control: "text" },
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
    },
  ]),
);

export default {
  title: "Components/Search field",
  argTypes,
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(SearchField, { params });
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
