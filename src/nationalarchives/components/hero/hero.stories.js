import Hero from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "@storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  supertitle: { control: "text" },
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
  body: { control: "text" },
  text: { control: "text" },
  imageSrc: { control: { type: "file", accept: ".jpg" } },
  imageAlt: { control: "text" },
  imageWidth: { control: { type: "number", min: 1 } },
  imageHeight: { control: { type: "number", min: 1 } },
  imageType: { control: "text" },
  imageSources: { control: "object" },
  imageCaption: { control: "text" },
  actions: { control: "object" },
  style: {
    control: "inline-radio",
    options: ["none", "contrast", "tint", "accent"],
  },
  layout: {
    control: "inline-radio",
    options: ["plain", "shift", "split"],
  },
  narrow: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Hero",
  argTypes,
};

const Template = ({
  supertitle,
  title,
  headingLevel,
  headingSize,
  body,
  text,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageType,
  imageSources,
  imageCaption,
  actions,
  style,
  layout,
  narrow,
  classes,
  attributes,
}) =>
  Hero({
    params: {
      supertitle,
      title,
      headingLevel,
      headingSize,
      body,
      text,
      imageSrc,
      imageAlt,
      imageWidth,
      imageHeight,
      imageType,
      imageSources,
      imageCaption,
      actions,
      style,
      layout,
      narrow,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
};

Standard.play = async ({ args, canvasElement, step }) => {
  await new Promise((r) => setTimeout(r, 100));

  const canvas = within(canvasElement);
  const image = canvas.getByAltText(args.imageAlt);
  const content = canvasElement.querySelector(".tna-hero__content");
  const summary = canvasElement.querySelector(".tna-hero__details-summary");
  const information = canvas.getByText(args.imageCaption);

  await step("Initial load", async () => {
    await expect(image).toBeVisible();
    await expect(content).toBeVisible();
    await expect(summary).toBeVisible();
    await expect(information).not.toBeVisible();
  });

  await step("Open information", async () => {
    await userEvent.click(summary);
    await expect(information).toBeVisible();
  });

  await step("Close information", async () => {
    await userEvent.click(summary);
    await expect(information).not.toBeVisible();
  });
};

export const LargeContent = Template.bind({});
LargeContent.parameters = {
  chromatic: { disableSnapshot: true },
};
LargeContent.args = {
  supertitle: "Focus on",
  title: "‘Not acceptable’: Gay Switchboard’s attempts to become a charity",
  body: `<p class="tna-large-paragraph">Switchboard LGBT+ Helpline is one of the oldest telephone help services for lesbian, gay, bisexual, transgender and queer people in the UK. Despite high demand for its support, prejudice and laws meant Switchboard’s journey to register as a charity was not easy.</p>`,
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
};

export const Accent = Template.bind({});
Accent.parameters = {
  chromatic: { disableSnapshot: true },
};
Accent.args = {
  supertitle: "Supertitle",
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  style: "accent",
};

export const Contrast = Template.bind({});
Contrast.parameters = {
  chromatic: { disableSnapshot: true },
};
Contrast.args = {
  supertitle: "Supertitle",
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  style: "contrast",
};

export const Tint = Template.bind({});
Tint.parameters = {
  chromatic: { disableSnapshot: true },
};
Tint.args = {
  supertitle: "Supertitle",
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  style: "tint",
};

export const Shifted = Template.bind({});
Shifted.args = {
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  style: "accent",
  layout: "shift",
};

export const Split = Template.bind({});
Split.args = {
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  style: "accent",
  layout: "split",
};

export const Narrow = Template.bind({});
Narrow.args = {
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  style: "accent",
  // layout: "split",
  narrow: true,
};

export const Actions = Template.bind({});
Actions.args = {
  supertitle: "Supertitle",
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  actions: [
    {
      text: "Action 1",
      href: "#",
    },
    {
      text: "Action 2",
      href: "#",
      icon: "globe",
    },
    {
      text: "Action 3",
      href: "#",
      title: "Go and do the action",
      icon: "chevron-right",
      rightAlignIcon: true,
    },
  ],
  style: "accent",
};

export const CaptionWithNoHeading = Template.bind({});
CaptionWithNoHeading.parameters = {
  chromatic: { disableSnapshot: true },
};
CaptionWithNoHeading.args = {
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
};

export const Sources = Template.bind({});
Sources.parameters = {
  chromatic: { disableSnapshot: true },
};
Sources.args = {
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageSources: [
    {
      src: "https://www.gstatic.com/webp/gallery/2.webp",
      type: "image/webp",
      media: "(max-width: 48em)",
      width: 550,
      height: 404,
    },
  ],
};

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: "small",
  },
  chromatic: {
    viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
  },
};
Mobile.args = {
  supertitle: "Supertitle",
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/2024/12/tna-building-800px.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 600,
  imageHeight: 400,
  imageCaption: "An interesting photo by a famous photographer ©2023",
};
