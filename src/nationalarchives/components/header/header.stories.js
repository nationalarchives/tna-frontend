import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

export default {
  title: "Components/Header",
  argTypes: Object.fromEntries(
    Object.entries({
      logo: { control: "object" },
      topNavigation: { control: "object" },
      navigation: { control: "object" },
      accent: {
        control: "boolean",
      },
      phaseBanner: { control: "object" },
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
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    logo: {
      strapline: "Design System",
      href: "#/",
    },
    topNavigation: [
      {
        text: "Top item 1",
        href: "#/top-1",
      },
      {
        text: "Top item 2",
        href: "#/top-2",
        icon: "heart",
      },
    ],
    navigation: [
      {
        text: "Alpha",
        href: "#/alpha",
        selected: true,
      },
      {
        text: "Beta",
        href: "#/beta",
      },
      {
        text: "Gamma",
        href: "#/gamma",
      },
    ],
    classes: "tna-header--demo",
  },
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));
    const $navigationItems = canvasElement.querySelector(
      `.tna-header__navigation-items`,
    );
    const $navigationToggle = canvasElement.querySelector(
      `.tna-header__navigation-button`,
    );
    await expect($navigationItems).toBeVisible();
    await expect($navigationToggle).not.toBeVisible();
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
    logo: {
      strapline: "Design System",
      href: "#/",
    },
    topNavigation: [
      {
        text: "Top item 1",
        href: "#/top-1",
      },
      {
        text: "Top item 2",
        href: "#/top-2",
        icon: "heart",
      },
    ],
    navigation: [
      {
        text: "Alpha",
        href: "#/alpha",
        selected: true,
      },
      {
        text: "Beta",
        href: "#/beta",
      },
      {
        text: "Gamma",
        href: "#/gamma",
      },
    ],
    exit: {
      text: "Go to the current National Archives website",
      href: "#",
      target: "_blank",
    },
    classes: "tna-header--demo",
  },
  play: async ({ args, canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 100));

    const canvas = within(canvasElement);

    const $navigationItems = canvasElement.querySelector(
      `.tna-header__navigation-items`,
    );
    const [$linkA, $linkB, $linkC] = args.navigation.map((navigationItem) =>
      canvas.getByText(navigationItem.text),
    );
    const $navigationToggle = canvasElement.querySelector(
      `.tna-header__navigation-button`,
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

    $navigationToggle.blur();
  },
};

export const WithPhaseBanner = {
  args: {
    logo: {
      strapline: "Design System",
      href: "#/",
    },
    topNavigation: [
      {
        text: "Top item 1",
        href: "#/top-1",
      },
      {
        text: "Top item 2",
        href: "#/top-2",
        icon: "heart",
      },
    ],
    navigation: [
      {
        text: "Alpha",
        href: "#/alpha",
        selected: true,
      },
      {
        text: "Beta",
        href: "#/beta",
      },
      {
        text: "Gamma",
        href: "#/gamma",
      },
    ],
    phaseBanner: {
      phase: "beta",
      message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
    },
    classes: "tna-header--demo",
  },
};
