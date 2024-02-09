import Header from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "@storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

const argTypes = {
  logo: { control: "object" },
  topNavigation: { control: "object" },
  navigation: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Global header",
  argTypes,
  parameters: {
    chromatic: { delay: 1000 },
  },
};

const Template = ({ logo, topNavigation, navigation, classes, attributes }) =>
  Header({
    params: {
      logo,
      topNavigation,
      navigation,
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
      text: "Search",
      href: "#/top-1",
      icon: "search",
    },
    {
      text: "Shop",
      href: "#/top-2",
      icon: "bag-shopping",
    },
    {
      text: "Sign in",
      href: "#/top-3",
      icon: "user",
    },
  ],
  navigation: [
    {
      text: "Visit",
      href: "#",
    },
    {
      text: "What's on",
      href: "#",
    },
    {
      text: "Explore the collection",
      href: "#",
    },
    {
      text: "Using the archives",
      href: "#",
    },
    {
      text: "Learn",
      href: "#",
    },
    {
      text: "Professional guidance & services",
      href: "#",
    },
  ],
  classes: "tna-global-header--demo",
};
Standard.play = async ({ canvasElement }) => {
  await new Promise((r) => setTimeout(r, 100));

  const $navigationItems = canvasElement.querySelector(
    `.tna-global-header__navigation`,
  );
  const $navigationToggle = canvasElement.querySelector(
    `.tna-global-header__navigation-button`,
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
  classes: "tna-global-header--demo",
};
Mobile.play = async ({ args, canvasElement, step }) => {
  await new Promise((r) => setTimeout(r, 100));

  const canvas = within(canvasElement);

  const $navigationItems = canvasElement.querySelector(
    `.tna-global-header__navigation`,
  );
  const [$linkA, $linkB, $linkC] = args.navigation.map((navigationItem) =>
    canvas.getByText(navigationItem.text),
  );
  const $navigationToggle = canvasElement.querySelector(
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

  $navigationToggle.blur();
};
