import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, expect } from "storybook/test";
import Cookies from "../../lib/cookies.mjs";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Footer",
  argTypes: Object.fromEntries(
    Object.entries({
      defaultContent: { control: "boolean" },
      defaultContentBaseURL: { control: "text" },
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
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    defaultContent: true,
    defaultContentBaseURL: "#",
  },
};

export const Minimal = {
  args: {},
};

export const ThemeSelector = {
  args: {
    themeSelector: true,
    currentTheme: "",
  },
  decorators: [
    (Story) => {
      const cookies = new Cookies({ secure: false, noInit: true });
      cookies.acceptPolicy("settings");
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
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
  },
};

export const ThemeSelectorWithoutCookies = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    themeSelector: true,
    currentTheme: "",
  },
  decorators: [
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
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const systemLightButton = canvas.getByText("System theme");
    const themeLightButton = canvas.getByText("Light theme");
    const darkLightButton = canvas.getByText("Dark theme");

    await expect(systemLightButton).not.toBeVisible();
    await expect(themeLightButton).not.toBeVisible();
    await expect(darkLightButton).not.toBeVisible();
  },
};
