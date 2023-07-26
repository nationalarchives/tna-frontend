import Picture from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  src: { control: "text" },
  width: { control: "number" },
  height: { control: "number" },
  sources: { control: "object" },
  caption: { control: "text" },
  transcript: { control: "text" },
  translation: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Work in progress/Picture",
  argTypes,
};

const Template = ({
  src,
  width,
  height,
  sources,
  caption,
  transcript,
  translation,
  classes,
  attributes,
}) => {
  return Picture({
    params: {
      src,
      width,
      height,
      sources,
      caption,
      transcript,
      translation,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  src: "https://picsum.photos/800/600",
  alt: "",
  width: 800,
  height: 600,
  caption: "<p>This is a pretty image</p>",
  transcript: "<p>Lorem ipsum transcript</p>",
  translation: "<p>Lorem ipsum translation</p>",
  classes: "tna-picture--demo",
};
