import Card from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { customViewports } from "../../../../.storybook/viewports";

export default {
  title: "Components/Card",
  argTypes: Object.fromEntries(
    Object.entries({
      supertitle: { control: "text" },
      plainSupertitle: { control: "boolean" },
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      href: { control: "text" },
      hrefClasses: { control: "text" },
      hrefAttributes: { control: "object" },
      imageSrc: { control: { type: "file", accept: ".jpg" } },
      imageAlt: { control: "text" },
      imageWidth: { control: { type: "number", min: 1 } },
      imageHeight: { control: { type: "number", min: 1 } },
      imageType: { control: "text" },
      imageSources: { control: "object" },
      lazyImage: { control: "boolean" },
      label: { control: "text" },
      labelColour: {
        control: "inline-radio",
        options: [
          "accent",
          "black",
          "pink",
          "orange",
          "yellow",
          "green",
          "blue",
        ],
      },
      meta: { control: "object" },
      metaStacked: { control: "boolean" },
      accentMeta: { control: "boolean" },
      body: { control: "text" },
      text: { control: "text" },
      actions: { control: "object" },
      fullAreaClick: { control: "boolean" },
      horizontal: { control: "boolean" },
      horizontalOnSmall: { control: "boolean" },
      horizontalFlipped: { control: "boolean" },
      horizontalSmallImage: { control: "boolean" },
      style: {
        control: "inline-radio",
        options: ["none", "plain", "contrast", "tint", "accent"],
      },
      htmlElement: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Card, { params });
  },
};

export const Standard = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Simple = {
  args: {
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Meta = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    labelColour: "green",
    meta: [
      { title: "Event date", text: "24th September 2023", icon: "calendar" },
      { title: "Cost", text: "From £16", icon: "ticket" },
      { title: "Location", text: "Online", icon: "location-dot" },
    ],
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Plain = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    style: "plain",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Contrast = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    style: "contrast",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Accent = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    href: "#",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    style: "accent",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const NoImage = {
  args: {
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    href: "#",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Actions = {
  args: {
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
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
  },
};

export const Horizontal = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    href: "#",
    headingLevel: 3,
    headingSize: "l",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    horizontal: true,
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const HorizontalContrast = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    href: "#",
    headingLevel: 3,
    headingSize: "l",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    horizontal: true,
    style: "contrast",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const HorizontalAccent = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    href: "#",
    headingLevel: 3,
    headingSize: "l",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    horizontal: true,
    style: "accent",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const HorizontalMinimal = {
  args: {
    title: "Card title",
    headingLevel: 3,
    headingSize: "l",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    horizontal: true,
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const HorizontalMobile = {
  parameters: {
    viewport: {
      defaultViewport: "tiny",
    },
    chromatic: {
      viewports: [customViewports["tiny"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    title: "Card title",
    headingLevel: 3,
    headingSize: "l",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    horizontal: true,
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const HorizontalContrastMobile = {
  parameters: {
    viewport: {
      defaultViewport: "tiny",
    },
    chromatic: {
      viewports: [customViewports["tiny"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    title: "Card title",
    headingLevel: 3,
    headingSize: "l",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    horizontal: true,
    style: "contrast",
    htmlElement: "article",
    classes: "tna-card--demo",
  },
}

export const All = () => `
<div class="tna-container">
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "plain" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "accent" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "tint" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "contrast" })}
  </div>
</div>
<div class="tna-container tna-!--margin-top-m">
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "plain" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "accent" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "tint" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "contrast" })}
  </div>
</div>
<div class="tna-container tna-!--margin-top-m">
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "plain" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "accent" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "tint" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "contrast" })}
  </div>
</div>
<div class="tna-container tna-!--margin-top-m">
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "plain" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "accent" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "tint" })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "contrast" })}
  </div>
</div>
<div class="tna-container tna-!--margin-top-m">
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "plain", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "accent", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "tint", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "contrast", fullAreaClick: true })}
  </div>
</div>
<div class="tna-container tna-!--margin-top-m">
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "plain", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "accent", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "tint", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-6">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "contrast", fullAreaClick: true })}
  </div>
</div>
<div class="tna-container">
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "plain" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "plain" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "plain", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "accent" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "accent" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "accent", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "tint" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "tint" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "tint", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "contrast" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "contrast" })}
  </div>
  <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "contrast", fullAreaClick: true })}
  </div>
  <div class="tna-column tna-column--width-2-3 tna-!--margin-top-m">
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, horizontalSmallImage: true, fullAreaClick: true })}
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, horizontalSmallImage: true, style: "plain", fullAreaClick: true })}
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, horizontalSmallImage: true, style: "accent", fullAreaClick: true })}
    ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, horizontalSmallImage: true, style: "contrast", fullAreaClick: true })}
  </div>
</div>`;
All.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FullClick = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    href: "#",
    headingLevel: 3,
    headingSize: "m",
    imageSrc:
      "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
    imageAlt: "The National Archives office",
    imageWidth: 600,
    imageHeight: 400,
    label: "New",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt velit, a molestie turpis.</p>",
    fullAreaClick: true,
    htmlElement: "article",
    classes: "tna-card--demo",
  },
};

export const Sources = {
  args: {
    supertitle: "Card supertitle",
    title: "Card title",
    headingLevel: 3,
    headingSize: "m",
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
  },
};

// export const All = () => `
// <div class="tna-container">
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "plain" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "accent" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "tint" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", imageSrc: null, style: "contrast" })}
//   </div>
// </div>
// <div class="tna-container tna-!--margin-top-m">
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "plain" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "accent" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "tint" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "contrast" })}
//   </div>
// </div>
// <div class="tna-container tna-!--margin-top-m">
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "plain" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "accent" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "tint" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", style: "contrast" })}
//   </div>
// </div>
// <div class="tna-container tna-!--margin-top-m">
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "plain" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "accent" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "tint" })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "contrast" })}
//   </div>
// </div>
// <div class="tna-container tna-!--margin-top-m">
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "plain", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "accent", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "tint", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", imageSrc: null, style: "contrast", fullAreaClick: true })}
//   </div>
// </div>
// <div class="tna-container tna-!--margin-top-m">
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "plain", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "accent", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "tint", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-6">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", style: "contrast", fullAreaClick: true })}
//   </div>
// </div>
// <div class="tna-container">
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "plain" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "plain" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "plain", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "accent" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "accent" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "accent", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "tint" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "tint" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "tint", fullAreaClick: true })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, supertitle: null, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "contrast" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "contrast" })}
//   </div>
//   <div class="tna-column tna-column--width-1-3 tna-!--margin-top-m">
//     ${Standard({ ...Standard.args, text: "Lorem ipsum", horizontal: true, horizontalOnSmall: true, style: "contrast", fullAreaClick: true })}
//   </div>
// </div>`;
// All.parameters = {
//   chromatic: { disableSnapshot: true },
// };
