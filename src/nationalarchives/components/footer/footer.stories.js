import Cookies from "@nationalarchives/cookies/src/index.js";
import { expect, userEvent, within } from "storybook/test";

import { renderString } from "../../../../.storybook/nunjucks.js";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

export default {
  title: "Components/Footer",
  argTypes: Object.fromEntries(
    Object.entries({
      defaultContent: { control: "boolean" },
      defaultContentBaseURL: { control: "text" },
      meta: { control: "text" },
      social: { control: "object" },
      navigation: { control: "object" },
      newsletter: { control: "object" },
      legal: { control: "object" },
      themeSelector: { control: "object" },
      cookiesURL: { control: "text" },
      openInNewTabText: { control: "text" },
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
  render: (params) => renderString(Template, { params }),
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
    themeSelector: {
      enabled: true,
      currentTheme: "light",
    },
    cookiesUrl: "#",
  },
  decorators: [
    (Story) => {
      const cookies = new Cookies({
        secure: false,
      });
      cookies.enablePreference("settings");
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      $systemThemeButton = canvas.getByText("System theme"),
      $lightThemeButton = canvas.getByText("Light theme"),
      $darkThemeButton = canvas.getByText("Dark theme"),
      $themeSelectorNotice = canvasElement.querySelector(
        `.tna-footer__theme-selector-notice`,
      ),
      $tnaTemplate = canvasElement.querySelector(".tna-template"),
      cookies = new Cookies({
        newInstance: true,
        secure: false,
      });

    await expect($systemThemeButton).toBeVisible();
    await expect($lightThemeButton).toBeVisible();
    await expect($darkThemeButton).toBeVisible();
    await expect($themeSelectorNotice).not.toBeVisible();

    await expect($tnaTemplate).toHaveClass("tna-template--light-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--dark-theme");
    await expect(cookies.preference("settings")).toBe(true);
    await expect(cookies.exists("theme")).toBe(true);
    await expect(cookies.get("theme")).toBe("light");

    await userEvent.click($darkThemeButton);
    await expect($tnaTemplate).toHaveClass("tna-template--dark-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--light-theme");
    await expect(cookies.get("theme")).toBe("dark");

    await userEvent.click($systemThemeButton);
    await expect($tnaTemplate).not.toHaveClass("tna-template--light-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--dark-theme");
    await expect(cookies.get("theme")).toBe("system");

    await userEvent.click($lightThemeButton);
    await expect($tnaTemplate).toHaveClass("tna-template--light-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--dark-theme");
    await expect(cookies.get("theme")).toBe("light");
  },
};

export const ThemeSelectorWithoutCookies = {
  args: {
    themeSelector: {
      enabled: true,
    },
    cookiesUrl: "#",
  },
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
    });
    cookies.set("cookie_preferences_set", true);

    const canvas = within(canvasElement),
      $systemThemeButton = canvas.getByText("System theme"),
      $lightThemeButton = canvas.getByText("Light theme"),
      $darkThemeButton = canvas.getByText("Dark theme"),
      $themeSelectorNotice = canvasElement.querySelector(
        `.tna-footer__theme-selector-notice`,
      ),
      $enableSettingsCookiesButton = canvas.getByText(
        "enable settings cookies",
      ),
      $tnaTemplate = canvasElement.querySelector(".tna-template");

    await expect($systemThemeButton).toBeVisible();
    await expect($lightThemeButton).toBeVisible();
    await expect($darkThemeButton).toBeVisible();
    await expect($themeSelectorNotice).toBeVisible();

    await expect($tnaTemplate).toHaveClass("tna-template--light-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--dark-theme");
    await expect(cookies.preference("settings")).toBe(false);
    await expect(cookies.exists("theme")).toBe(false);

    await userEvent.click($darkThemeButton);
    await expect($tnaTemplate).toHaveClass("tna-template--dark-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--light-theme");
    await expect(cookies.exists("theme")).toBe(false);

    await userEvent.click($systemThemeButton);
    await expect($tnaTemplate).not.toHaveClass("tna-template--light-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--dark-theme");
    await expect(cookies.exists("theme")).toBe(false);

    await userEvent.click($lightThemeButton);
    await expect($tnaTemplate).toHaveClass("tna-template--light-theme");
    await expect($tnaTemplate).not.toHaveClass("tna-template--dark-theme");
    await expect(cookies.exists("theme")).toBe(false);

    await userEvent.click($enableSettingsCookiesButton);
    await expect($themeSelectorNotice).not.toBeVisible();
    await expect(cookies.preference("settings")).toBe(true);
    await expect(cookies.exists("theme")).toBe(true);
    await expect(cookies.get("theme")).toBe("light");

    await userEvent.click($darkThemeButton);
    await expect(cookies.get("theme")).toBe("dark");

    await userEvent.click($systemThemeButton);
    await expect(cookies.get("theme")).toBe("system");

    await userEvent.click($lightThemeButton);
    await expect(cookies.get("theme")).toBe("light");

    cookies.disableAllPreferences();
  },
};
