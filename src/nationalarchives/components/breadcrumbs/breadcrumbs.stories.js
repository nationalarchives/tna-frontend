import Breadcrumbs from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "@storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  items: { control: "object" },
  noCollapse: { control: "boolean" },
  structuredData: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Breadcrumbs",
  argTypes,
};

const Template = ({ items, noCollapse, structuredData, classes, attributes }) =>
  Breadcrumbs({
    params: {
      items,
      noCollapse,
      structuredData,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  items: [
    {
      text: "Alpha",
      href: "#/alpha",
    },
    {
      text: "Beta",
      href: "#/beta",
    },
    {
      text: "Gamma",
      href: "#/gamma",
    },
    {
      text: "Delta",
      href: "#/delta",
    },
    {
      text: "Epsilon",
      href: "#/epsilon",
    },
  ],
  classes: "tna-breadcrumbs--demo",
};

export const NoCollapse = Template.bind({});
NoCollapse.parameters = {
  viewport: {
    defaultViewport: "small",
  },
  chromatic: {
    viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
  },
};
NoCollapse.args = {
  ...Standard.args,
  noCollapse: true,
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
  ...Standard.args,
};

export const MobileExpanded = Template.bind({});
MobileExpanded.parameters = {
  viewport: {
    defaultViewport: "small",
  },
  chromatic: {
    viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
  },
};
MobileExpanded.args = {
  ...Standard.args,
};
MobileExpanded.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const $module = document.querySelector('[data-module="tna-breadcrumbs"]');
  const $items = args.items.map((item) => canvas.getByText(item.text));
  const $expandButton = document.querySelector(
    ".tna-breadcrumbs__item--expandable button",
  );

  await expect($items[0]).toBeVisible();
  await expect($items[1]).not.toBeVisible();
  await expect($items[2]).not.toBeVisible();
  await expect($items[3]).not.toBeVisible();
  await expect($items[4]).toBeVisible();
  await expect($expandButton).toBeVisible();

  await userEvent.click($expandButton);

  await expect($items[0]).toBeVisible();
  await expect($items[1]).toBeVisible();
  await expect($items[2]).toBeVisible();
  await expect($items[3]).toBeVisible();
  await expect($items[4]).toBeVisible();
  await expect($expandButton).not.toBeVisible();

  await expect($module).toHaveFocus();
};
