import Card from "./template.njk";
import macroOptions from "./macro-options.json";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l"] },
  href: { control: "text" },
  hrefClasses: { control: "text" },
  hrefAttributes: { control: "object" },
  imageSrc: { control: { type: "file", accept: ".jpg" } },
  imageAlt: { control: "text" },
  imageWidth: { control: { type: "number", min: 1 } },
  imageHeight: { control: { type: "number", min: 1 } },
  imageType: { control: "text" },
  imageSources: { control: "object" },
  label: { control: "text" },
  meta: { control: "object" },
  body: { control: "text" },
  text: { control: "text" },
  actions: { control: "object" },
  horizontal: { control: "boolean" },
  style: {
    control: "inline-radio",
    options: ["none", "contrast", "tint", "accent"],
  },
  plainSupertitle: { control: "boolean" },
  htmlElement: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  const macroOption = macroOptions.find((option) => option.name === argType);
  argTypes[argType] = {
    ...argTypes[argType],
    description: macroOption?.description,
  };
});

export default {
  title: "Components/Card",
  argTypes,
};

const Template = ({
  supertitle,
  title,
  headingLevel,
  headingSize,
  href,
  hrefClasses,
  hrefAttributes,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageType,
  imageSources,
  label,
  meta,
  body,
  text,
  actions,
  horizontal,
  style,
  plainSupertitle,
  htmlElement,
  classes,
  attributes,
}) =>
  Card({
    params: {
      supertitle,
      title,
      headingLevel,
      headingSize,
      href,
      hrefClasses,
      hrefAttributes,
      imageSrc,
      imageAlt,
      imageWidth,
      imageHeight,
      imageType,
      imageSources,
      label,
      meta,
      body,
      text,
      actions,
      horizontal,
      style,
      plainSupertitle,
      htmlElement,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  href: "#",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Simple = Template.bind({});
Simple.args = {
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Meta = Template.bind({});
Meta.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  href: "#",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  meta: [
    { text: "24th September 2023", icon: "calendar" },
    { text: "From £16", icon: "ticket" },
    { text: "Online", icon: "location-dot" },
  ],
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const PlainSupertitle = Template.bind({});
PlainSupertitle.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  href: "#",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  plainSupertitle: true,
  classes: "tna-card--demo",
};

export const Contrast = Template.bind({});
Contrast.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  href: "#",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  style: "contrast",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Accent = Template.bind({});
Accent.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  href: "#",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  style: "accent",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const NoImage = Template.bind({});
NoImage.args = {
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  href: "#",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Actions = Template.bind({});
Actions.args = {
  title: "Card title",
  headingLevel: 3,
  headingSize: "m",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  actions: [
    {
      text: "Card action 1",
      href: "#",
    },
    {
      text: "Card action 2",
      href: "#",
      title: "Go and do the action",
    },
  ],
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  href: "#",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  horizontal: true,
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const HorizontalContrast = Template.bind({});
HorizontalContrast.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  href: "#",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  horizontal: true,
  style: "contrast",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const HorizontalAccent = Template.bind({});
HorizontalAccent.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  href: "#",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  horizontal: true,
  style: "accent",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const HorizontalMinimal = Template.bind({});
HorizontalMinimal.args = {
  title: "Card title",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  horizontal: true,
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const HorizontalMobile = Template.bind({});
HorizontalMobile.parameters = {
  viewport: {
    defaultViewport: "small",
  },
  chromatic: {
    viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
  },
};
HorizontalMobile.args = {
  title: "Card title",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  horizontal: true,
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const Sources = Template.bind({});
Sources.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  imageSrc: "https://www.gstatic.com/webp/gallery/2.jpg",
  imageAlt: "A man in a canoe paddling through white water",
  imageWidth: 550,
  imageHeight: 404,
  imageSources: [
    {
      src: "https://www.gstatic.com/webp/gallery/2.webp",
      type: "image/webp",
    },
  ],
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  classes: "tna-card--demo",
};
