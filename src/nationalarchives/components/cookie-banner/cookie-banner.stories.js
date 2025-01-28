import CookieBanner from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "@storybook/test";
import Cookies from "../../lib/cookies.mjs";

const argTypes = {
  serviceName: { control: "text" },
  cookiesUrl: { control: "text" },
  preferencesSetKey: { control: "text" },
  style: {
    control: "inline-radio",
    options: ["none", "contrast", "accent", "tint"],
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
  title: "Components/Cookie banner",
  argTypes,
};

const Template = ({
  serviceName,
  cookiesUrl,
  preferencesSetKey,
  style,
  classes,
  attributes,
}) =>
  CookieBanner({
    params: {
      serviceName,
      cookiesUrl,
      preferencesSetKey,
      style,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  cookiesUrl: "#",
  cookiesPath: "/tna-frontend/",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};

export const Accept = Template.bind({});
Accept.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};
Accept.play = async ({ canvasElement }) => {
  const cookies = new Cookies({ secure: false, noInit: true });
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("false");

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
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

  // const closeButton = canvas.getByText("Hide cookies message");
  // await expect(closeButton).toBeVisible();
  // await userEvent.click(closeButton);

  // await expect(closeButton).not.toBeVisible();

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

export const Reject = Template.bind({});
Reject.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};
Reject.play = async ({ canvasElement }) => {
  const cookies = new Cookies({ secure: false, noInit: true });
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("false");

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
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

export const Existing = Template.bind({});
Existing.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};
Existing.decorators = [
  (Story) => {
    const cookies = new Cookies({ secure: false, noInit: true });
    cookies.init();
    cookies.acceptPolicy("settings");
    cookies.acceptPolicy("usage");
    return Story();
  },
];
Existing.play = async ({ canvasElement }) => {
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

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).not.toBeVisible();
  await expect(rejectButton).not.toBeVisible();

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

export const Partial = Template.bind({});
Partial.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};
Partial.decorators = [
  (Story) => {
    const cookies = new Cookies({ secure: false, noInit: true });
    cookies.set(
      "cookies_policy",
      JSON.stringify({
        usage: true,
        essential: false,
      }),
    );
    return Story();
  },
];
Partial.play = async ({ canvasElement }) => {
  const cookies = new Cookies({
    newInstance: true,
    secure: false,
    noInit: true,
  });
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("false");

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).toBeVisible();
  await expect(rejectButton).toBeVisible();

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

export const Malformed = Template.bind({});
Malformed.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};
Malformed.decorators = [
  (Story) => {
    document.documentElement.setAttribute("data-tna-cookies-insecure", "true");
    const cookies = new Cookies({ secure: false, noInit: true });
    cookies.set("cookies_policy", "foobar");
    return Story();
  },
];
Malformed.play = async ({ canvasElement }) => {
  const cookies = new Cookies({
    newInstance: true,
    secure: false,
    noInit: true,
  });
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("false");

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).toBeVisible();
  await expect(rejectButton).toBeVisible();

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

export const UnexpectedHidden = Template.bind({});
UnexpectedHidden.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
  disableMockAnalytics: true,
};
UnexpectedHidden.decorators = [
  (Story) => {
    document.documentElement.setAttribute("data-tna-cookies-insecure", "true");
    document.cookie = "cookie_preferences_set=true";
    return Story();
  },
];
UnexpectedHidden.play = async ({ canvasElement }) => {
  const cookies = new Cookies({
    newInstance: true,
    secure: false,
    noInit: true,
  });
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("marketing")).toEqual(false);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("false");

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).toBeVisible();
  await expect(rejectButton).toBeVisible();

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
