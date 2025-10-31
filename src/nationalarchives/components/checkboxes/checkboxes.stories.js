import Checkboxes from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Checkboxes",
  argTypes: Object.fromEntries(
    Object.entries({
      label: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: {
        control: "inline-radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
      id: { control: "text" },
      name: { control: "text" },
      hint: { control: "text" },
      error: { control: "object" },
      items: { control: "object" },
      small: { control: "boolean" },
      inline: { control: "boolean" },
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
    nunjucks.configure("src");
    return nunjucks.renderString(Checkboxes, { params });
  },
};

export const Standard = {
  args: {
    label: "Categories",
    headingLevel: 4,
    headingSize: "m",
    id: "categories1",
    name: "categories1",
    items: [
      {
        text: "Alpha",
        value: "alpha",
      },
      {
        text: "Beta",
        value: "beta",
      },
      {
        text: "Gamma",
        value: "gamma",
      },
    ],
    classes: "tna-checkboxes--demo",
  },
};

export const Small = {
  args: {
    label: "Categories",
    headingLevel: 4,
    headingSize: "m",
    id: "categories2",
    name: "categories2",
    items: [
      {
        text: "Admiralty, Navy, Royal Marines, and Coastguard",
        value: "ADM",
      },
      {
        text: "Air Ministry and Royal Air Force records",
        value: "AIR",
      },
      {
        text: "Board of Trade and successors",
        value: "BT",
      },
      {
        text: "Chancery, the Wardrobe, Royal Household, Exchequer and various commissions",
        value: "C",
      },
      {
        text: "Colonial Office, Commonwealth and Foreign and Commonwealth Offices",
        value: "CO",
      },
      {
        text: "Exchequer, Office of First Fruits and Tenths, and the Court of Augmentations",
        value: "E",
      },
      {
        text: "Foreign Office",
        value: "FO",
      },
      {
        text: "Home Office",
        value: "HO",
      },
      {
        text: "Prerogative Court of Canterbury",
        value: "PROB",
      },
      {
        text: "War Office, Armed Forces, Judge Advocate General, and related bodies",
        value: "WO",
      },
    ],
    small: true,
    classes: "tna-checkboxes--demo",
  },
};

export const Preselected = {
  args: {
    label: "Categories",
    headingLevel: 4,
    headingSize: "m",
    id: "categories3",
    name: "categories3",
    items: [
      {
        text: "Alpha",
        value: "alpha",
      },
      {
        text: "Beta",
        value: "beta",
        checked: true,
      },
      {
        text: "Gamma",
        value: "gamma",
      },
    ],
    classes: "tna-checkboxes--demo",
  },
};

export const WithHint = {
  args: {
    label: "Categories",
    headingLevel: 4,
    headingSize: "m",
    id: "categories4",
    name: "categories4",
    hint: "Select all that apply.",
    items: [
      {
        text: "Alpha",
        value: "alpha",
      },
      {
        text: "Beta",
        value: "beta",
      },
      {
        text: "Gamma",
        value: "gamma",
      },
    ],
    classes: "tna-checkboxes--demo",
  },
};

export const Error = {
  args: {
    label: "Categories",
    headingLevel: 4,
    headingSize: "m",
    id: "categories5",
    name: "categories5",
    error: {
      text: "You must select a category",
    },
    items: [
      {
        text: "Alpha",
        value: "alpha",
      },
      {
        text: "Beta",
        value: "beta",
      },
      {
        text: "Gamma",
        value: "gamma",
      },
    ],
    classes: "tna-checkboxes--demo",
  },
};

export const Inline = {
  args: {
    label: "Categories",
    headingLevel: 4,
    headingSize: "xs",
    id: "categories6",
    name: "categories6",
    items: [
      {
        text: "Alpha",
        value: "alpha",
      },
      {
        text: "Beta",
        value: "beta",
      },
      {
        text: "Gamma",
        value: "gamma",
      },
    ],
    inline: true,
    classes: "tna-checkboxes--demo",
  },
};

export const Single = {
  args: {
    id: "terms",
    name: "terms",
    items: [
      {
        text: "I agree to the terms and conditions",
        value: "agree",
      },
    ],
    classes: "tna-checkboxes--demo",
  },
};

export const SingleWithLabel = {
  args: {
    label: "Terms and conditions",
    headingLevel: 4,
    headingSize: "m",
    id: "terms",
    name: "terms",
    items: [
      {
        text: "I agree to the terms and conditions",
        value: "agree",
      },
    ],
    classes: "tna-checkboxes--demo",
  },
};
