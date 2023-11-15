import Radios from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  name: { control: "text" },
  hint: { control: "text" },
  error: { control: "object" },
  items: { control: "object" },
  selected: { control: "text" },
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
  title: "Components/Radios",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  name,
  hint,
  error,
  items,
  selected,
  small,
  classes,
  attributes,
}) =>
  Radios({
    params: {
      label,
      headingLevel,
      headingSize,
      name,
      hint,
      error,
      items,
      selected,
      small,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type1",
  items: [
    {
      text: "Audio",
      value: "audio",
    },
    {
      text: "Image",
      value: "image",
    },
    {
      text: "Video",
      value: "video",
    },
  ],
  classes: "tna-radios--demo",
};

export const Small = Template.bind({});
Small.args = {
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type2",
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
  classes: "tna-radios--demo",
};

export const Preselected = Template.bind({});
Preselected.args = {
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type3",
  items: [
    {
      text: "Audio",
      value: "audio",
    },
    {
      text: "Image",
      value: "image",
    },
    {
      text: "Video",
      value: "video",
    },
  ],
  selected: "image",
  classes: "tna-radios--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type4",
  hint: "You can only select one.",
  items: [
    {
      text: "Audio",
      value: "audio",
    },
    {
      text: "Image",
      value: "image",
    },
    {
      text: "Video",
      value: "video",
    },
  ],
  classes: "tna-radios--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type5",
  error: {
    text: "You must select a type",
  },
  items: [
    {
      text: "Audio",
      value: "audio",
    },
    {
      text: "Image",
      value: "image",
    },
    {
      text: "Video",
      value: "video",
    },
  ],
  classes: "tna-radios--demo",
};
