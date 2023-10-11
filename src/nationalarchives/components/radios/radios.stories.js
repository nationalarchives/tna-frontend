import Radios from "./template.njk";
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
  title: "Components/Radios",
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
  Radios({
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
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type1",
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

export const Small = Template.bind({});
Small.args = {
  label: "Type",
  headingLevel: 4,
  headingSize: "m",
  name: "type2",
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
  small: true,
  classes: "tna-radios--demo",
};
