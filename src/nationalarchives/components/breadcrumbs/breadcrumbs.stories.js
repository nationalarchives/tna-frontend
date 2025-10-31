import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

nunjucks.configure("src");

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
  parameters: {
    viewport: {
      options: customViewports,
    },
  },
  render: (params) => {
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
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
  },
  args: {
    ...Standard.args,
    noCollapse: true,
  },
};

export const Mobile = {
  parameters: {
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
  },
  args: {
    ...Standard.args,
  },
};

export const MobileExpanded = {
  parameters: {
    chromatic: {
      viewports: [customViewports["small"].styles.width.replace(/px$/, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
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
    await expect($module).not.toHaveAttribute("tabindex");

    await userEvent.click($expandButton);

    await expect($items[0]).toBeVisible();
    await expect($items[1]).toBeVisible();
    await expect($items[2]).toBeVisible();
    await expect($items[3]).toBeVisible();
    await expect($items[4]).toBeVisible();
    await expect($expandButton).not.toBeVisible();
    await expect($module).toHaveAttribute("tabindex");
    await expect($module.getAttribute("tabindex")).toEqual("0");

    await expect($module).toHaveFocus();

    // await $module.blur();
    await userEvent.keyboard("{Tab}");
    await expect($module).not.toHaveFocus();
    await expect($module).not.toHaveAttribute("tabindex");
    await expect(
      canvas.getByRole("link", { name: args.items[0].text }),
    ).toHaveFocus();
  },
};
