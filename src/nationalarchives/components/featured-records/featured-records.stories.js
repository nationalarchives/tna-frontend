import FeaturedRecords from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  items: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Featured records",
  argTypes,
};

const Template = ({ items, classes, attributes }) =>
  FeaturedRecords({
    params: {
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  items: [
    {
      imageSrc:
        "https://beta.nationalarchives.gov.uk/media/images/wedderburn-trial.max-832x591.format-webp_i3c9pUH.webp",
      imageWidth: 576,
      imageHeight: 591,
      collection: "TS 11/45/167",
      title: "Court records relating to Robert Wedderburn's trial",
      href: "#",
      date: "1819–1820",
    },
    {
      collection: "HO 42/191",
      title: "Home office letters",
      href: "#",
      date: "1819",
    },
  ],
  classes: "tna-featured-records--demo",
};
