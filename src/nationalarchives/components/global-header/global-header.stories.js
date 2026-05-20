import nunjucks from "nunjucks";
import { expect, userEvent, within } from "storybook/test";

import { customViewports } from "../../../../.storybook/viewports";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Global header",
  argTypes: Object.fromEntries(
    Object.entries({
      defaultContent: { control: "boolean" },
      defaultContentBaseURL: { control: "text" },
      logo: { control: "object" },
      topNavigation: { control: "object" },
      navigation: { control: "object" },
      collapseOnMedium: { control: "boolean" },
      navigationId: { control: "text" },
      topNavigationId: { control: "text" },
      phaseBanner: { control: "object" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
    viewport: {
      options: customViewports,
    },
  },
  render: (params) => nunjucks.renderString(Template, { params }),
};

export const Standard = {
  args: {
    defaultContent: true,
    defaultContentBaseURL: "#",
    classes: "tna-global-header--demo",
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const $navigationItems = canvasElement.querySelector(
        `.tna-global-header__navigation`,
      ),
      $navigationToggle = canvasElement.querySelector(
        `.tna-global-header__navigation-button`,
      );

    await expect($navigationItems).toBeVisible();
    await expect($navigationToggle).not.toBeVisible();
  },
};

export const Medium = {
  parameters: {
    chromatic: {
      viewports: [customViewports.medium.styles.width.replace(/px$/u, "")],
    },
  },
  globals: {
    viewport: { value: "medium" },
  },
  args: {
    defaultContent: true,
    defaultContentBaseURL: "#",
    classes: "tna-global-header--demo",
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const $navigationItems = canvasElement.querySelector(
        `.tna-global-header__navigation`,
      ),
      $navigationToggle = canvasElement.querySelector(
        `.tna-global-header__navigation-button`,
      );

    await expect($navigationItems).toBeVisible();
    await expect($navigationToggle).not.toBeVisible();
  },
};

export const MediumCollapsed = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  globals: {
    viewport: { value: "medium" },
  },
  args: {
    defaultContent: true,
    defaultContentBaseURL: "#",
    collapseOnMedium: true,
    classes: "tna-global-header--demo",
  },
};

export const Mobile = {
  parameters: {
    chromatic: {
      viewports: [customViewports.small.styles.width.replace(/px$/u, "")],
    },
  },
  globals: {
    viewport: { value: "small" },
  },
  args: {
    defaultContent: true,
    defaultContentBaseURL: "#",
    classes: "tna-global-header--demo",
  },
  play: async ({ canvasElement, step }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = within(canvasElement),
      $navigationItems = canvasElement.querySelector(
        `.tna-global-header__navigation`,
      ),
      [$linkA, $linkB, $linkC] = [
        "Visit",
        "Explore the collection",
        "Education",
      ].map((navigationItemText) => canvas.getByText(navigationItemText)),
      $navigationToggle = canvasElement.querySelector(
        `.tna-global-header__navigation-button`,
      );

    await step("Initial load", async () => {
      await expect($navigationItems).not.toBeVisible();
      await expect($navigationToggle).toBeVisible();
      await expect($navigationToggle).toHaveAttribute("aria-expanded", "false");
      await expect($linkA).not.toBeVisible();
      await expect($linkB).not.toBeVisible();
      await expect($linkC).not.toBeVisible();
    });

    await step("Open the menu", async () => {
      await userEvent.click($navigationToggle);
      await expect($navigationItems).toBeVisible();
      await expect($navigationToggle).toBeVisible();
      await expect($navigationToggle).toHaveAttribute("aria-expanded", "true");
      await expect($linkA).toBeVisible();
      await expect($linkB).toBeVisible();
      await expect($linkC).toBeVisible();
    });

    await step("Close the menu", async () => {
      await userEvent.click($navigationToggle);
      await expect($navigationItems).not.toBeVisible();
      await expect($navigationToggle).toBeVisible();
      await expect($navigationToggle).toHaveAttribute("aria-expanded", "false");
      await expect($linkA).not.toBeVisible();
      await expect($linkB).not.toBeVisible();
      await expect($linkC).not.toBeVisible();
    });

    // Await step("Open the menu", async () => {
    //   Await userEvent.click($navigationToggle);
    // });

    // TODO
    // Await step("Press the escape key", async () => {
    //   Await expect($navigationItems).not.toBeVisible();
    //   Await expect($navigationToggle).toBeVisible();
    //   Await expect($navigationToggle).toHaveAttribute("aria-expanded", "false");
    //   Await expect($linkA).not.toBeVisible();
    //   Await expect($linkB).not.toBeVisible();
    //   Await expect($linkC).not.toBeVisible();
    // });

    await $navigationToggle.blur();
  },
};

export const WithPhaseBanner = {
  args: {
    defaultContent: true,
    defaultContentBaseURL: "#",
    phaseBanner: {
      phase: "beta",
      message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
    },
    classes: "tna-global-header--demo",
  },
};
