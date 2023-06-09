import Hero from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  heading: { control: "text" },
  body: { control: "text" },
  text: { control: "text" },
  image: { control: "object" },
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

const Template = ({ heading, body, text, image, classes, attributes }) => {
  return Hero({
    params: {
      heading,
      body,
      text,
      image,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  heading: "Title",
  body: "<p>Body</p>",
  image: {
    src: "https://picsum.photos/id/29/640/360",
    alt: "A placeholder image",
    information: "Photo of some mountains by a famous photographer, ©2012",
  },
  classes: "tna-hero--demo",
};

Standard.play = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement);
  const image = canvas.getByAltText(args.image.alt);
  const title = canvas.getByText(args.heading);
  const summary = canvasElement.querySelector(
    ".tna-hero__image-details-summary",
  );
  const information = canvas.getByText(args.image.information);

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

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  heading: "Title",
  image: {
    src: "https://picsum.photos/id/29/640/360",
    alt: "A placeholder image",
  },
  classes: "tna-hero--demo",
};
