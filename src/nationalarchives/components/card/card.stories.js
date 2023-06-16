import Header from "./template.njk";
import "../../all.scss";
import "./_card.scss";
import macroOptions from "./macro-options.json";

const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  href: { control: "text" },
  image: { control: "object" },
  body: { control: "text" },
  actions: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "text" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType
  )?.description;
});

export default {
  title: "Components/Card",
  argTypes,
};

const Template = ({
  supertitle,
  title,
  href,
  image,
  body,
  actions,
  classes,
  attributes,
}) => {
  return Header({
    params: {
      supertitle,
      title,
      href,
      image,
      body,
      actions,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  href: "#",
  image: {
    src: "https://loremflickr.com/640/360",
    alt: "",
  },
  body: "<p>Card body</p>",
  actions: [
    {
      text: "Card action 1",
      href: "#",
      title: "Go and do the first action",
    },
    {
      text: "Card action 2",
      href: "#",
    },
  ],
  classes: "tna-card--demo",
};
