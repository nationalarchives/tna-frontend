import Picture from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  src: { control: "text" },
  width: { control: "number" },
  height: { control: "number" },
  sources: { control: "object" },
  caption: { control: "text" },
  informationLabelOpen: { control: "text" },
  informationLabelClose: { control: "text" },
  informationItemHeadingLevel: { control: { type: "number", min: 1, max: 6 } },
  information: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Picture",
  argTypes,
};

const Template = ({
  src,
  width,
  height,
  sources,
  caption,
  informationLabelOpen,
  informationLabelClose,
  informationItemHeadingLevel,
  information,
  classes,
  attributes,
}) =>
  Picture({
    params: {
      src,
      width,
      height,
      sources,
      caption,
      informationLabelOpen,
      informationLabelClose,
      informationItemHeadingLevel,
      information,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  src: "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  alt: "The National Archives office",
  width: 600,
  height: 400,
  caption: "<p>This is a pretty image</p>",
  informationItemHeadingLevel: 3,
  information: [
    {
      id: "transcript",
      title: "Transcript",
      body: "<p>Lorem ipsum transcript</p>",
    },
    {
      id: "translation",
      title: "Translation",
      body: "<p>Lorem ipsum translation</p>",
    },
  ],
  classes: "tna-picture--demo",
};
