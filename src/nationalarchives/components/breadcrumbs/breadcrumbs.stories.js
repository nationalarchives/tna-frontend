import Breadcrumbs from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = Object.fromEntries(
  Object.entries({
    items: { control: "object" },
    noCollapse: { control: "boolean" },
    labelText: { control: "text" },
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
);

export default {
  title: "Components/Breadcrumbs",
  argTypes,
  render: (params) => {
    return nunjucks.renderString(Breadcrumbs, { params });
  },
};

const Template = ({ items, noCollapse, labelText, classes, attributes }) =>
  Breadcrumbs({
    params: {
      items,
      noCollapse,
      labelText,
      classes,
      attributes,
    },
  });

export const Standard = {
  args: {
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
  },
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
