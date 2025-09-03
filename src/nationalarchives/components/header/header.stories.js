import Header from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "@storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  logo: { control: "object" },
  topNavigation: { control: "object" },
  navigation: { control: "object" },
  accent: {
    control: "boolean",
  },
  phaseBanner: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Header",
  argTypes,
  parameters: {
    chromatic: { delay: 1000 },
  },
};

const Template = ({
  logo,
  topNavigation,
  navigation,
  accent,
  phaseBanner,
  classes,
  attributes,
}) =>
  Header({
    params: {
      logo,
      topNavigation,
      navigation,
      accent,
      phaseBanner,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
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
};
Standard.play = async ({ canvasElement }) => {
  await new Promise((r) => setTimeout(r, 100));

  const $navigationItems = canvasElement.querySelector(
    `.tna-header__navigation-items`,
  );
  const $navigationToggle = canvasElement.querySelector(
    `.tna-header__navigation-button`,
  );

  await expect($navigationItems).toBeVisible();
  await expect($navigationToggle).not.toBeVisible();
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
};
Mobile.play = async ({ args, canvasElement, step }) => {
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
};

export const WithPhaseBanner = Template.bind({});
WithPhaseBanner.args = {
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
};
