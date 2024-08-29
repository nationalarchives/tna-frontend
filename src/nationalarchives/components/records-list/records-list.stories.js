import RecordsList from "./template.njk";
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
  title: "Components/Records list",
  argTypes,
};

const Template = ({ items, classes, attributes }) =>
  RecordsList({
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
      imageSrc: "https://picsum.photos/id/237/400/600",
      imageWidth: 400,
      imageHeight: 600,
      collection: "TS 11/45/167",
      title: "Court records relating to Robert Wedderburn’s trial",
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
  classes: "tna-records-list--demo",
};
