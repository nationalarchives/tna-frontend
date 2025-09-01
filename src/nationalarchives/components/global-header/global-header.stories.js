import Header from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";
import { customViewports } from "../../../../.storybook/viewports";

export default {
  title: "Components/Global header",
  argTypes: Object.fromEntries(
    Object.entries({
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
      },
    ]),
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Header, { params });
  },
};

export const Standard = {
  args: {
    logo: {
      href: "#/",
    },
    topNavigation: [
      {
        text: "Search",
        href: "https://www.nationalarchives.gov.uk/search/",
        icon: "search",
      },
      {
        text: "Shop",
        href: "https://shop.nationalarchives.gov.uk/",
        icon: "shop",
      },
      {
        text: "Sign in",
        href: "#/sign-in",
        icon: "user",
      },
    ],
    navigation: [
      {
        text: "Visit",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/",
      },
      {
        text: "What’s on",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/whats-on/",
      },
      {
        text: "Explore the collection",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/",
      },
      {
        text: "Help using the archive",
        href: "https://www.nationalarchives.gov.uk/help-with-your-research/",
      },
      {
        text: "Education",
        href: "https://www.nationalarchives.gov.uk/education/",
      },
      {
        text: "Professional guidance and services",
        href: "https://www.nationalarchives.gov.uk/professional-guidance-and-services/",
      },
    ],
    classes: "tna-global-header--demo",
  },
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));

    const $navigationItems = canvasElement.querySelector(
      `.tna-global-header__navigation`,
    );
    const $navigationToggle = canvasElement.querySelector(
      `.tna-global-header__navigation-button`,
    );

    await expect($navigationItems).toBeVisible();
    await expect($navigationToggle).not.toBeVisible();
  },
};

export const Medium = {
  parameters: {
    viewport: {
      defaultViewport: "medium",
    },
    chromatic: {
      viewports: [customViewports["medium"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    logo: {
      href: "#/",
    },
    topNavigation: [
      {
        text: "Search",
        href: "https://www.nationalarchives.gov.uk/search/",
        icon: "search",
      },
      {
        text: "Shop",
        href: "https://shop.nationalarchives.gov.uk/",
        icon: "shop",
      },
      {
        text: "Sign in",
        href: "#/sign-in",
        icon: "user",
      },
    ],
    navigation: [
      {
        text: "Visit",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/",
      },
      {
        text: "What’s on",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/whats-on/",
      },
      {
        text: "Explore the collection",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/",
      },
      {
        text: "Help using the archive",
        href: "https://www.nationalarchives.gov.uk/help-with-your-research/",
      },
      {
        text: "Education",
        href: "https://www.nationalarchives.gov.uk/education/",
      },
      {
        text: "Professional guidance and services",
        href: "https://www.nationalarchives.gov.uk/professional-guidance-and-services/",
      },
    ],
    classes: "tna-global-header--demo",
  },
  play: async ({ canvasElement }) => {
    await new Promise((r) => setTimeout(r, 100));

    const $navigationItems = canvasElement.querySelector(
      `.tna-global-header__navigation`,
    );
    const $navigationToggle = canvasElement.querySelector(
      `.tna-global-header__navigation-button`,
    );

    await expect($navigationItems).toBeVisible();
    await expect($navigationToggle).not.toBeVisible();
  },
};

export const MediumCollapsed = {
  parameters: {
    viewport: {
      defaultViewport: "medium",
    },
    chromatic: {
      viewports: [customViewports["medium"].styles.width.replace(/px$/, "")],
    },
  },
  args: {
    logo: {
      href: "#/",
    },
    topNavigation: [
      {
        text: "Search",
        href: "https://www.nationalarchives.gov.uk/search/",
        icon: "search",
      },
      {
        text: "Shop",
        href: "https://shop.nationalarchives.gov.uk/",
        icon: "shop",
      },
      {
        text: "Sign in",
        href: "#/sign-in",
        icon: "user",
      },
    ],
    navigation: [
      {
        text: "Visit",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/",
      },
      {
        text: "What’s on",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/whats-on/",
      },
      {
        text: "Explore the collection",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/",
      },
      {
        text: "Help using the archive",
        href: "https://www.nationalarchives.gov.uk/help-with-your-research/",
      },
      {
        text: "Education",
        href: "https://www.nationalarchives.gov.uk/education/",
      },
      {
        text: "Professional guidance and services",
        href: "https://www.nationalarchives.gov.uk/professional-guidance-and-services/",
      },
    ],
    collapseOnMedium: true,
    classes: "tna-global-header--demo",
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
        text: "Search",
        href: "https://www.nationalarchives.gov.uk/search/",
        icon: "search",
      },
      {
        text: "Shop",
        href: "https://shop.nationalarchives.gov.uk/",
        icon: "shop",
      },
      {
        text: "Sign in",
        href: "#/sign-in",
        icon: "user",
      },
    ],
    navigation: [
      {
        text: "Visit",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/",
      },
      {
        text: "What’s on",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/whats-on/",
      },
      {
        text: "Explore the collection",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/",
      },
      {
        text: "Help using the archive",
        href: "https://www.nationalarchives.gov.uk/help-with-your-research/",
      },
      {
        text: "Education",
        href: "https://www.nationalarchives.gov.uk/education/",
      },
      {
        text: "Professional guidance and services",
        href: "https://www.nationalarchives.gov.uk/professional-guidance-and-services/",
      },
    ],
    classes: "tna-global-header--demo",
  },
  play: async ({ args, canvasElement, step }) => {
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

    // await step("Open the menu", async () => {
    //   await userEvent.click($navigationToggle);
    // });

    // TODO
    // await step("Press the escape key", async () => {
    //   await expect($navigationItems).not.toBeVisible();
    //   await expect($navigationToggle).toBeVisible();
    //   await expect($navigationToggle).toHaveAttribute("aria-expanded", "false");
    //   await expect($linkA).not.toBeVisible();
    //   await expect($linkB).not.toBeVisible();
    //   await expect($linkC).not.toBeVisible();
    // });

    $navigationToggle.blur();
  },
};

export const WithPhaseBanner = {
  args: {
    logo: {
      href: "#/",
    },
    topNavigation: [
      {
        text: "Search",
        href: "https://www.nationalarchives.gov.uk/search/",
        icon: "search",
      },
      {
        text: "Shop",
        href: "https://shop.nationalarchives.gov.uk/",
        icon: "shop",
      },
      {
        text: "Sign in",
        href: "#/sign-in",
        icon: "user",
      },
    ],
    navigation: [
      {
        text: "Visit",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/",
      },
      {
        text: "What’s on",
        href: "https://www.nationalarchives.gov.uk/about/visit-us/whats-on/",
      },
      {
        text: "Explore the collection",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/",
      },
      {
        text: "Help using the archive",
        href: "https://www.nationalarchives.gov.uk/help-with-your-research/",
      },
      {
        text: "Education",
        href: "https://www.nationalarchives.gov.uk/education/",
      },
      {
        text: "Professional guidance and services",
        href: "https://www.nationalarchives.gov.uk/professional-guidance-and-services/",
      },
    ],
    phaseBanner: {
      phase: "beta",
      message: `This is a new service – <a href="#">give us your feedback</a> to help improve it.`,
    },
    classes: "tna-global-header--demo",
  },
};
