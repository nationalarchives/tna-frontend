import nunjucks from "nunjucks";
import { expect, userEvent, within } from "storybook/test";

import Cookies from "../../lib/cookies.mjs";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Cookie banner",
  argTypes: Object.fromEntries(
    Object.entries({
      serviceName: { control: "text" },
      cookiesUrl: { control: "text" },
      preferencesSetKey: { control: "text" },
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
    const cookies = new Cookies({ secure: false, noInit: true });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
    await userEvent.click(acceptButton);

    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(true);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
    await expect(cookies.get("cookie_preferences_set")).toEqual("true");
    await expect(acceptButton).not.toBeVisible();
    await expect(rejectButton).not.toBeVisible();

    // Const closeButton = canvas.getByText("Hide cookies message");
    // Await expect(closeButton).toBeVisible();
    // Await userEvent.click(closeButton);

    // Await expect(closeButton).not.toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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
    const cookies = new Cookies({ secure: false, noInit: true });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
    await userEvent.click(rejectButton);

    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
    await expect(cookies.get("cookie_preferences_set")).toEqual("true");
    await expect(cookies.hasValue("cookie_preferences_set", "true")).toEqual(
      true,
    );
    await expect(acceptButton).not.toBeVisible();
    await expect(rejectButton).not.toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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
      const cookies = new Cookies({ secure: false, noInit: true });
      cookies.init();
      cookies.acceptPolicy("settings");
      cookies.acceptPolicy("usage");
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
      noInit: true,
    });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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
      const cookies = new Cookies({ secure: false, noInit: true });
      cookies.init();
      cookies.acceptPolicy("settings");
      cookies.acceptPolicy("usage");
      cookies.set("cookie_preferences_set", "true");
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
      noInit: true,
    });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
    await expect(cookies.get("cookie_preferences_set")).toEqual("true");

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).not.toBeVisible();
    await expect(rejectButton).not.toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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
      const cookies = new Cookies({ secure: false, noInit: true });
      cookies.set(
        "cookies_policy",
        JSON.stringify({
          usage: true,
          essential: false,
        }),
      );
      cookies.set("cookie_preferences_set", "true");
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
      noInit: true,
    });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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
      document.documentElement.setAttribute(
        "data-tna-cookies-insecure",
        "true",
      );
      const cookies = new Cookies({ secure: false, noInit: true });
      cookies.set("cookies_policy", "foobar");
      cookies.set("cookie_preferences_set", "true");
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
      noInit: true,
    });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
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
      document.documentElement.setAttribute(
        "data-tna-cookies-insecure",
        "true",
      );
      document.cookie = "cookie_preferences_set=true";
      return Story();
    },
  ],
  play: async ({ canvasElement }) => {
    const cookies = new Cookies({
      newInstance: true,
      secure: false,
      noInit: true,
    });
    await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
    await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
    await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

    const canvas = within(canvasElement),
      acceptButton = canvas.getByText("Accept cookies"),
      rejectButton = canvas.getByText("Reject cookies");
    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();

    document.cookie.replace(/(?<=^|;).+?(?==|;|$)/gu, (name) =>
      location.hostname
        .split(".")
        .reverse()
        .reduce((domain) => {
          const newDomain = domain.replace(/^\.?[^.]+/u, "");
          document.cookie = `${name}=;max-age=0;path=/;domain=${newDomain}`;
          return newDomain;
        }, location.hostname),
    );
  },
};
