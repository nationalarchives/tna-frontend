import SensitiveImage from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  src: { control: "text" },
  alt: { control: "text" },
  warning: { control: "text" },
  action: { control: "text" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Sensitive image",
  argTypes,
};

const Template = ({ image, warning, action, classes, attributes }) => {
  return SensitiveImage({
    params: {
      image,
      warning,
      action,
      classes,
      attributes,
    },
  });
};

export const Standard = Template.bind({});
Standard.args = {
  image: {
    src: "https://picsum.photos/id/237/800/600",
    alt: "A placeholder image",
    width: 800,
    height: 600,
  },
  warning: "This is a gory photo",
  action: "Show me the gory photo",
  classes: "tna-sensitive-image--demo",
  attributes: {
    "data-testid": "sensitive-image-test",
  },
};

export const Test = Template.bind({});
Test.args = {
  image: {
    src: "https://picsum.photos/id/237/800/600",
    alt: "A placeholder image",
    width: 800,
    height: 600,
  },
  warning: "This is a gory photo",
  action: "Show me the gory photo",
  classes: "tna-sensitive-image--demo",
  attributes: {
    "data-testid": "sensitive-image-test",
  },
};

Test.play = async ({ args, canvasElement }) => {
  await new Promise((r) => setTimeout(r, 100));

  const canvas = within(canvasElement);

  const image = canvas.getByAltText(args.image.alt);
  await expect(image).not.toBeVisible();
  const warning = canvas.getByText(args.warning);
  await expect(warning).toBeVisible();
  const summaryOpen = canvas.getByText(args.action);
  await expect(summaryOpen).toBeVisible();

  await userEvent.click(summaryOpen);
  await expect(image).toBeVisible();
  await expect(warning).toBeVisible();
};
