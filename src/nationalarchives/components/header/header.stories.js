import Header from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { customViewports } from "../../../../.storybook/preview";

const argTypes = {
  logo: { control: "object" },
  topNavigation: { control: "object" },
  navigation: { control: "object" },
  colour: {
    control: "radio",
    options: ["black", "yellow", "pink", "orange", "green", "blue"],
  },
  exit: { control: "object" },
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
  colour,
  exit,
  classes,
  attributes,
}) =>
  Header({
    params: {
      logo,
      topNavigation,
      navigation,
      colour,
      exit,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  logo: {
    strapline: "Beta",
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
    },
    {
      text: "Top item 3",
      href: "#/top-3",
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
  colour: "yellow",
  exit: {
    text: "Go to the current National Archives website",
    href: "#",
    target: "_blank",
  },
  classes: "tna-header--demo",
};

export const Desktop = Template.bind({});
Desktop.parameters = {
  viewport: {
    defaultViewport: "medium",
  },
  chromatic: {
    viewports: [customViewports["medium"].styles.width.replace(/px$/, "")],
  },
};
Desktop.args = {
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
Desktop.play = async ({ canvasElement }) => {
  await new Promise((r) => setTimeout(r, 100));

  const $navigationItems = canvasElement.querySelector(
    `.tna-header__navigation-items`,
  );
  const $navigationToggle = canvasElement.querySelector(
    `.tna-header__navigation-toggle-button`,
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
    `.tna-header__navigation-toggle-button`,
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

// export const NoJavascript = Template.bind({});
// NoJavascript.args = {
//   navigation: [
//     {
//       text: "Alpha",
//       href: "#/alpha",
//       selected: true,
//     },
//     {
//       text: "Beta",
//       href: "#/beta",
//     },
//     {
//       text: "Gamma",
//       href: "#/gamma",
//     },
//   ],
//   classes: "tna-header--demo",
// };
// NoJavascript.play = async ({ args, canvasElement, step }) => {
//   document.documentElement.classList.remove("tna-template--js-enabled");
//   canvasElement.innerHTML = canvasElement.innerHTML;
//   const $navigationToggleWrapper = canvasElement.querySelector(
//     `.tna-header__navigation-toggle`,
//   );
//   $navigationToggleWrapper.innerHTML = "";

//   const canvas = within(canvasElement);

//   // const $navigationItems = canvasElement.querySelector(
//   //   `.tna-header__navigation-items`,
//   // );
//   // const [$linkA, $linkB, $linkC] = args.navigation.map((navigationItem) =>
//   //   canvas.getByText(navigationItem.text),
//   // );
//   // await expect($navigationItems).toBeVisible();
//   // await expect($linkA).toBeVisible();
//   // await expect($linkB).toBeVisible();
//   // await expect($linkC).toBeVisible();
// };
