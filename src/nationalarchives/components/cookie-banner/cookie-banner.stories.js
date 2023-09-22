import CookieBanner from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import Cookies from "../../lib/cookies.mjs";

const argTypes = {
  url: { control: "text" },
  policies: { control: "text" },
  cookiesPreferencesSetKey: { control: "text" },
  loadScriptsOnAccept: { control: "text" },
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
  url,
  policies,
  cookiesPreferencesSetKey,
  loadScriptsOnAccept,
  classes,
  attributes,
}) =>
  CookieBanner({
    params: {
      url,
      policies,
      cookiesPreferencesSetKey,
      loadScriptsOnAccept,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};

const deleteAllCookies = (cookies) => {
  Object.keys(cookies.all).forEach((cookie) => cookies.delete(cookie));
};

export const Accept = Template.bind({});
Accept.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};
Accept.play = async ({ canvasElement }) => {
  const cookies = new Cookies();
  deleteAllCookies(cookies);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).toBeVisible();
  await expect(rejectButton).toBeVisible();
  await userEvent.click(acceptButton);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(true);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);
  await expect(acceptButton).not.toBeVisible();
  await expect(rejectButton).not.toBeVisible();

  // const closeButton = canvas.getByText("Close this message");
  // await expect(closeButton).toBeVisible();
  // await userEvent.click(closeButton);

  // await expect(closeButton).not.toBeVisible();

  deleteAllCookies(cookies);
};

export const Reject = Template.bind({});
Reject.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};
Reject.play = async ({ canvasElement }) => {
  const cookies = new Cookies();
  deleteAllCookies(cookies);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).toBeVisible();
  await expect(rejectButton).toBeVisible();
  await userEvent.click(rejectButton);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);
  await expect(acceptButton).not.toBeVisible();
  await expect(rejectButton).not.toBeVisible();

  deleteAllCookies(cookies);
};

export const CustomPolicies = Template.bind({});
CustomPolicies.args = {
  cookiesUrl: "#",
  policies: "custom",
  classes: "tna-cookie-banner--demo",
};
CustomPolicies.play = async ({ args, canvasElement }) => {
  const cookies = new Cookies(args.policies.split(","));
  deleteAllCookies(cookies);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(null);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(null);
  await expect(cookies.isPolicyAccepted("custom")).toEqual(false);

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  await userEvent.click(acceptButton);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(null);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(null);
  await expect(cookies.isPolicyAccepted("custom")).toEqual(true);

  deleteAllCookies(cookies);
};

export const AddScriptsOnAccept = Template.bind({});
AddScriptsOnAccept.args = {
  cookiesUrl: "#",
  loadScriptsOnAccept: "my-usage-script.js",
  classes: "tna-cookie-banner--demo",
};
AddScriptsOnAccept.play = async ({ args, canvasElement }) => {
  const cookies = new Cookies();
  deleteAllCookies(cookies);

  const noScript = document.querySelector(
    `script[src="${args.loadScriptsOnAccept}"]`,
  );
  await expect(noScript).toEqual(null);

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  await userEvent.click(acceptButton);

  const script = document.querySelector(
    `script[src="${args.loadScriptsOnAccept}"]`,
  );
  await expect(script).toBeTruthy();

  deleteAllCookies(cookies);
  script.remove();
};
