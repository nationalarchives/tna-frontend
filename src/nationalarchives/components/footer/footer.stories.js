import Footer from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, expect } from "@storybook/test";
import Cookies from "../../lib/cookies.mjs";

const argTypes = {
  meta: { control: "text" },
  defaultContent: { control: "boolean" },
  defaultContentBaseURL: { control: "text" },
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
  defaultContent,
  defaultContentBaseURL,
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
      defaultContent,
      defaultContentBaseURL,
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
  defaultContent: true,
  defaultContentBaseURL: "#",
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
