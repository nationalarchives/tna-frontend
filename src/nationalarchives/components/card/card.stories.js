import Card from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l"] },
  href: { control: "text" },
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
  style: { control: "inline-radio", options: ["none", "boxed", "accent"] },
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

export const Boxed = Template.bind({});
Boxed.args = {
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
  style: "boxed",
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

export const Horizontal = Template.bind({});
Horizontal.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  actions: [
    {
      text: "Card action",
      href: "#",
      title: "Go and do the action",
      icon: "calendar",
    },
  ],
  horizontal: true,
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const HorizontalBoxed = Template.bind({});
HorizontalBoxed.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  actions: [
    {
      text: "Card action",
      href: "#",
      title: "Go and do the action",
      icon: "calendar",
    },
  ],
  horizontal: true,
  style: "boxed",
  htmlElement: "article",
  classes: "tna-card--demo",
};

export const HorizontalAccent = Template.bind({});
HorizontalAccent.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "l",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  label: "New",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  actions: [
    {
      text: "Card action",
      href: "#",
      title: "Go and do the action",
      icon: "calendar",
    },
  ],
  horizontal: true,
  style: "accent",
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

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  supertitle: "Card supertitle",
  title: "Card title",
  headingLevel: 3,
  headingSize: "s",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
  htmlElement: "article",
  classes: "tna-card--demo",
};

const GridTemplate = ({
  title,
  supertitle,
  headingLevel,
  headingSize,
  href,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageSources,
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
        `<div class="tna-column tna-column--width-1-3 tna-column--width-1-2-small tna-column--full-tiny tna-!--margin-bottom-m">
          ${Card({
            params: {
              title,
              supertitle,
              headingLevel,
              headingSize,
              href,
              imageSrc,
              imageAlt,
              imageWidth,
              imageHeight,
              imageSources,
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
  classes: "tna-card--demo",
};
