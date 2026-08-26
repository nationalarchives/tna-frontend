import Cookies from "@nationalarchives/cookies/src/index.js";
import nunjucks from "nunjucks";
import { expect, userEvent, within } from "storybook/test";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Cookie banner",
  argTypes: Object.fromEntries(
    Object.entries({
      serviceName: { control: "text" },
      cookiesUrl: { control: "text" },
      style: {
        control: "inline-radio",
        options: ["none", "contrast", "accent", "tint"],
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
  render: (params) => nunjucks.renderString(Template, { params }),
};

export const Standard = {
  args: {
    cookiesUrl: "#",
    cookiesPath: "/tna-frontend/",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
};

export const Accept = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(false);
    await expect(cookies.preference("settings")).toEqual(false);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
    await userEvent.click(acceptButton);

    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(true);
    await expect(cookies.preference("settings")).toEqual(true);
    await expect(cookies.preference("marketing")).toEqual(true);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
    await expect(cookies.get("cookie_preferences_set")).toEqual("true");
    await expect(acceptButton).not.toBeVisible();
    await expect(rejectButton).not.toBeVisible();
  },
};

export const Reject = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(false);
    await expect(cookies.preference("settings")).toEqual(false);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
    await userEvent.click(rejectButton);

    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(false);
    await expect(cookies.preference("settings")).toEqual(false);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
    await expect(cookies.get("cookie_preferences_set")).toEqual("true");
    await expect(cookies.hasValue("cookie_preferences_set", "true")).toEqual(
      true,
    );
    await expect(acceptButton).not.toBeVisible();
    await expect(rejectButton).not.toBeVisible();
  },
};

export const RejectAndClose = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      rejectButton = canvas.getByText("Reject cookies");
    await userEvent.click(rejectButton);

    const [, closeButton] = canvas.getAllByText("Hide cookies message");
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(closeButton).not.toBeVisible();
  },
};

export const ExistingNotComplete = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  decorators: [
    (Story) => {
      document.cookie =
        /* eslint-disable-next-line no-secrets/no-secrets */
        "cookie_preferences=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22marketing%22%3Afalse%2C%22essential%22%3Atrue%7D";
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(true);
    await expect(cookies.preference("settings")).toEqual(true);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
  },
};

export const ExistingAndComplete = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  decorators: [
    (Story) => {
      document.cookie =
        /* eslint-disable-next-line no-secrets/no-secrets */
        "cookie_preferences=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22marketing%22%3Afalse%2C%22essential%22%3Atrue%7D";
      document.cookie = "cookie_preferences_set=true";
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(true);
    await expect(cookies.preference("settings")).toEqual(true);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
    await expect(cookies.get("cookie_preferences_set")).toEqual("true");

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).not.toBeVisible();
    await expect(rejectButton).not.toBeVisible();
  },
};

export const Partial = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  decorators: [
    (Story) => {
      document.cookie =
        /* eslint-disable-next-line no-secrets/no-secrets */
        "cookie_preferences=%7B%22usage%22%3Atrue%2C%22essential%22%3Atrue%7D";
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(true);
    await expect(cookies.preference("settings")).toEqual(false);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
  },
};

export const Malformed = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  decorators: [
    (Story) => {
      document.cookie = "cookie_preferences=foobar";
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(false);
    await expect(cookies.preference("settings")).toEqual(false);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
  },
};

export const FalseCompletion = {
  args: {
    serviceName: "My service",
    cookiesUrl: "#",
    classes: "tna-cookie-banner--demo",
    disableMockAnalytics: true,
  },
  parameters: {
    // TODO: Not sure why this test is failing in Chromatic, but it works locally
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => {
      document.cookie = "cookie_preferences=%7B%7D";
      document.cookie = "cookie_preferences_set=true";
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({ secure: false });
    await expect(cookies.preference("essential")).toEqual(true);
    await expect(cookies.preference("usage")).toEqual(false);
    await expect(cookies.preference("settings")).toEqual(false);
    await expect(cookies.preference("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
  },
};
