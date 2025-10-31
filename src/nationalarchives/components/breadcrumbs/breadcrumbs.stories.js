import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

export default {
  title: "Components/Breadcrumbs",
  argTypes: Object.fromEntries(
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
  ),
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

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

export const NoCollapse = {
  parameters: {
    viewport: {
      defaultViewport: "small",
    },
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    ...Standard.args,
    noCollapse: true,
  },
};

export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: "small",
    },
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    ...Standard.args,
  },
};

export const MobileExpanded = {
  parameters: {
    viewport: {
      defaultViewport: "small",
    },
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    ...Standard.args,
  },
  play: async ({ args, canvasElement }) => {
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
  },
};
