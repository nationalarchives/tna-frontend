import Hero from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  heading: { control: "text" },
  body: { control: "text" },
  text: { control: "text" },

  imageSrc: { control: { type: "file", accept: ".jpg" } },
  imageAlt: { control: "text" },
  imageWidth: { control: { type: "number", min: 1 } },
  imageHeight: { control: { type: "number", min: 1 } },

  imageCaption: { control: "text" },

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
  heading,
  body,
  text,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageCaption,
  classes,
  attributes,
}) =>
  Hero({
    params: {
      heading,
      body,
      text,
      imageSrc,
      imageAlt,
      imageWidth,
      imageHeight,
      imageCaption,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  heading: "Title",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  classes: "tna-hero--demo",
};

Standard.play = async ({ args, canvasElement, step }) => {
  await new Promise((r) => setTimeout(r, 100));

  const canvas = within(canvasElement);
  const image = canvas.getByAltText(args.imageAlt);
  const title = canvas.getByText(args.heading);
  const summary = canvasElement.querySelector(".tna-hero__details-summary");
  const information = canvas.getByText(args.imageCaption);

  await step("Initial load", async () => {
    await expect(image).toBeVisible();
    await expect(title).toBeVisible();
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

export const HeadingOnly = Template.bind({});
HeadingOnly.args = {
  heading: "Title",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  classes: "tna-hero--demo",
};

export const CaptionWithNoHeading = Template.bind({});
CaptionWithNoHeading.args = {
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  classes: "tna-hero--demo",
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
  heading: "Title",
  body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
  imageSrc:
    "https://www.nationalarchives.gov.uk/wp-content/uploads/sites/24/2023/07/tna-building-compress.jpg",
  imageAlt: "The National Archives office",
  imageWidth: 499,
  imageHeight: 333,
  imageCaption: "An interesting photo by a famous photographer ©2023",
  classes: "tna-hero--demo",
};
