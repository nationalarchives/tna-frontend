import Card from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  heading: { control: "object" },
  href: { control: "text" },
  image: { control: "object" },
  label: { control: "text" },
  body: { control: "text" },
  text: { control: "text" },
  actions: { control: "object" },
  horizontal: { control: "boolean" },
  style: { control: "text" },
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
  label,
  body,
  text,
  actions,
  horizontal,
  style,
  htmlElement,
  classes,
  attributes,
}) =>
  Card({
    params: {
      heading,
      href,
      image,
      label,
      body,
      text,
      actions,
      horizontal,
      style,
      htmlElement,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    size: "l",
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  label: "New",
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

export const Boxed = Template.bind({});
Boxed.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    size: "l",
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  label: "New",
  body: "<p>Card body</p>",
  style: "contrast",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Accent = Template.bind({});
Accent.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    size: "l",
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  label: "New",
  body: "<p>Card body</p>",
  style: "accent",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    size: "l",
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  label: "New",
  body: "<p>Card body</p>",
  actions: [
    {
      text: "Card action",
      href: "#",
      title: "Go and do the action",
    },
  ],
  horizontal: true,
  htmlElement: "article",
  classes: "tna-card--demo",
};

const GridTemplate = ({
  heading,
  href,
  image,
  label,
  body,
  text,
  actions,
  horizontal,
  htmlElement,
  classes,
  attributes,
}) =>
  `<div class="tna-container">
    ${Array(12)
      .fill(
        `<div class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny tna-!--margin-bottom-l">
          ${Card({
            params: {
              heading,
              href,
              image,
              label,
              body,
              text,
              actions,
              horizontal,
              htmlElement,
              classes,
              attributes,
            },
          })}
        </div>`,
      )
      .join("")}
  </div>`;

export const Grid = GridTemplate.bind({});
Grid.args = {
  heading: {
    supertitle: "Card supertitle",
    title: "Card title",
    level: 3,
    singleSentence: false,
  },
  href: "#",
  image: {
    src: "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
    alt: "The National Archives office",
    width: 1996,
    height: 1331,
  },
  label: "New",
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
