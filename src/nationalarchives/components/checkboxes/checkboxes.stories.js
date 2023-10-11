import Checkboxes from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m"] },
  name: { control: "text" },
  hint: { control: "text" },
  items: { control: "object" },
  small: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Checkboxes",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  name,
  hint,
  items,
  small,
  classes,
  attributes,
}) =>
  Checkboxes({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      hint,
      items,
      small,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Categories",
  headingLevel: 4,
  headingSize: "m",
  name: "categories1",
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
};

export const Small = Template.bind({});
Small.args = {
  label: "Categories",
  headingLevel: 4,
  headingSize: "m",
  name: "categories2",
  hint: "Select all that apply.",
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
};

export const Preselected = Template.bind({});
Preselected.args = {
  label: "Categories",
  headingLevel: 4,
  headingSize: "m",
  name: "categories3",
  hint: "Select all that apply.",
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
};
