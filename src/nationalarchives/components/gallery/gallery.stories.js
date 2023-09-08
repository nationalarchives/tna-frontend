import Gallery from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";

const argTypes = {
  items: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Gallery",
  argTypes,
};

const Template = ({ items, classes, attributes }) =>
  Gallery({
    params: {
      items,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  items: Array(6)
    .fill({
      alt: "",
      width: "",
      height: "",
    })
    .map((item, index) => ({
      ...item,
      src: `https://picsum.photos/id/${index + 1}/${
        index % 3 === 0 ? "800/600" : index % 3 === 1 ? "600/600" : "600/800"
      }`,
      alt: `Photo ${index + 1}`,
      description: `Photo #${index + 1}`,
    })),

  classes: "tna-gallery--demo",
};

Standard.play = async ({ args, canvasElement, step }) => {
  // const canvas = within(canvasElement);
  // const image = canvas.getByAltText(args.image.alt);
  // const title = canvas.getByText(args.heading);
  // const summary = canvasElement.querySelector(
  //   ".tna-hero__image-details-summary",
  // );
  // const information = canvas.getByText(args.image.information);
  // await step("Initial load", async () => {
  //   await expect(image).toBeVisible();
  //   await expect(title).toBeVisible();
  //   await expect(summary).toBeVisible();
  //   await expect(information).not.toBeVisible();
  // });
  // await step("Open information", async () => {
  //   await userEvent.click(summary);
  //   await expect(information).toBeVisible();
  // });
  // await step("Close information", async () => {
  //   await userEvent.click(summary);
  //   await expect(information).not.toBeVisible();
  // });
};
