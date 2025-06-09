import Footer from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, expect } from "@storybook/test";
import Cookies from "../../lib/cookies.mjs";

const argTypes = {
  meta: { control: "text" },
  social: { control: "object" },
  navigation: { control: "object" },
  showNewsletter: { control: "boolean" },
  legal: { control: "object" },
  themeSelector: { control: "boolean" },
  currentTheme: {
    control: "inline-radio",
    options: ["system", "light", "dark", ""],
  },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Footer",
  argTypes,
};

const Template = ({
  meta,
  social,
  navigation,
  showNewsletter,
  legal,
  themeSelector,
  currentTheme,
  classes,
  attributes,
}) =>
  Footer({
    params: {
      meta,
      social,
      navigation,
      showNewsletter,
      legal,
      themeSelector,
      currentTheme,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  social: [
    {
      href: "https://twitter.com/UKNatArchives",
      icon: "twitter",
      title: "The National Archives X feed (formerly known as Twitter)",
    },
    {
      href: "https://www.youtube.com/c/TheNationalArchivesUK",
      icon: "youtube",
      title: "The National Archives YouTube channel",
    },
    {
      href: "https://www.facebook.com/TheNationalArchives",
      icon: "facebook",
      title: "The National Archives Facebook page",
    },
    {
      href: "https://www.flickr.com/photos/nationalarchives",
      icon: "flickr",
      title: "The National Archives Flickr feed",
    },
    {
      href: "https://www.instagram.com/nationalarchivesuk/",
      icon: "instagram",
      title: "The National Archives Instagram feed",
    },
  ],
  navigation: [
    {
      title: "Quick links",
      items: [
        {
          text: "About us",
          href: "https://www.nationalarchives.gov.uk/about/",
        },
        {
          text: "Contact us",
          href: "https://www.nationalarchives.gov.uk/contact-us/",
        },
        {
          text: "News",
          href: "https://www.nationalarchives.gov.uk/about/news/",
        },
        {
          text: "Blogs",
          href: "https://www.nationalarchives.gov.uk/blogs/",
        },
        {
          text: "Podcasts",
          href: "https://media.nationalarchives.gov.uk/index.php/category/podcasts-2/",
        },
        {
          text: "Image library",
          href: "https://images.nationalarchives.gov.uk/",
        },
        {
          text: "Press room",
          href: "https://www.nationalarchives.gov.uk/about/press-room/",
        },
        {
          text: "Jobs",
          href: "https://www.nationalarchives.gov.uk/about/jobs/",
        },
        {
          text: "British citizenship services",
          href: "https://www.nationalarchives.gov.uk/contact-us/british-citizenship-services/",
        },
        {
          text: "Historical Manuscripts Commission",
          href: "https://www.nationalarchives.gov.uk/archives-sector/our-archives-sector-role/historical-manuscripts-commission/",
        },
      ],
    },
    {
      title: "Other websites",
      items: [
        {
          text: "UK Government Web Archive",
          href: "https://www.nationalarchives.gov.uk/webarchive/",
        },
        { text: "Legislation.gov.uk", href: "https://www.legislation.gov.uk/" },
        {
          text: "Find Case Law",
          href: "https://caselaw.nationalarchives.gov.uk/",
        },
        {
          text: "The Gazette",
          href: "https://www.thegazette.co.uk/",
          external: true,
        },
        {
          text: "The National Archives Trust",
          href: "https://www.nationalarchivestrust.org.uk/",
          external: true,
        },
        {
          text: "Friends of The National Archives",
          href: "https://ftna.org.uk/",
          external: true,
        },
        {
          text: "The National Archives Design System",
          href: "https://design-system.nationalarchives.gov.uk/",
        },
        {
          text: "The National Archives Design System",
          href: "https://design-system.nationalarchives.gov.uk/",
        },
      ],
    },
  ],
  showNewsletter: true,
  legal: [
    {
      text: "Accessibility statement",
      href: "#/accessibility",
    },
    {
      text: "Freedom of information",
      href: "#/freedom-of-information",
    },
    {
      text: "Terms and conditions",
      href: "#/terms-and-conditions",
    },
    {
      text: "Privacy policy",
      href: "#/privacy",
    },
    {
      text: "Cookies",
      href: "#/cookies",
    },
  ],
};

export const Minimal = Template.bind({});
Minimal.args = {};

export const ThemeSelector = Template.bind({});
ThemeSelector.args = {
  themeSelector: true,
  currentTheme: "",
};
ThemeSelector.decorators = [
  (Story) => {
    const cookies = new Cookies({ secure: false, noInit: true });
    cookies.acceptPolicy("settings");
    return Story();
  },
];
ThemeSelector.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const systemLightButton = canvas.getByText("System theme");
  const themeLightButton = canvas.getByText("Light theme");
  const darkLightButton = canvas.getByText("Dark theme");

  await expect(systemLightButton).toBeVisible();
  await expect(themeLightButton).toBeVisible();
  await expect(darkLightButton).toBeVisible();

  document.cookie.replace(/(?<=^|;).+?(?==|;|$)/g, (name) =>
    location.hostname
      .split(".")
      .reverse()
      .reduce(
        (domain) => (
          (domain = domain.replace(/^\.?[^.]+/, "")),
          (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
          domain
        ),
        location.hostname,
      ),
  );
};

export const ThemeSelectorWithoutCookies = Template.bind({});
ThemeSelectorWithoutCookies.parameters = {
  chromatic: { disableSnapshot: true },
};
ThemeSelectorWithoutCookies.args = {
  themeSelector: true,
  currentTheme: "",
};
ThemeSelectorWithoutCookies.decorators = [
  (Story) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
      noInit: true,
    });
    cookies.set("cookie_preferences_set", true);
    cookies.rejectPolicy("settings");
    return Story();
  },
];
ThemeSelectorWithoutCookies.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const systemLightButton = canvas.getByText("System theme");
  const themeLightButton = canvas.getByText("Light theme");
  const darkLightButton = canvas.getByText("Dark theme");

  await expect(systemLightButton).not.toBeVisible();
  await expect(themeLightButton).not.toBeVisible();
  await expect(darkLightButton).not.toBeVisible();
};
