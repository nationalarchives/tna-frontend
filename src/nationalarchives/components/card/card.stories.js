import Card from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "object" },
  href: { control: "text" },
  image: { control: "object" },
  body: { control: "text" },
  text: { control: "text" },
  actions: { control: "object" },
  featured: { control: "boolean" },
  htmlElement: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Card",
  argTypes,
};

const Template = ({
  heading,
  href,
  image,
  body,
  text,
  actions,
  featured,
  htmlElement,
  classes,
  attributes,
}) => {
  return Card({
    params: {
      heading,
      href,
      image,
      body,
      text,
      actions,
      featured,
      htmlElement,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    size: "m",
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  body: "<p>Card body</p>",
  // actions: [
  //   {
  //     text: "Card action",
  //     href: "#",
  //     title: "Go and do the action",
  //   },
  // ],
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Featured = Template.bind({});
Featured.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    size: "m",
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  body: "<p>Card body</p>",
  actions: [
    {
      text: "Card action",
      href: "#",
      title: "Go and do the action",
    },
  ],
  featured: true,
  htmlElement: "article",
  classes: "tna-card--demo",
};
