import CookieBanner from "./template.njk";
import macroOptions from "./macro-options.json";
import { expect, jest } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import Cookies from "../../lib/cookies.mjs";

const argTypes = {
  cookiesUrl: { control: "text" },
  policies: { control: "text" },
  cookiesPreferencesSetKey: { control: "text" },
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
  cookiesUrl,
  policies,
  cookiesPreferencesSetKey,
  classes,
  attributes,
}) =>
  CookieBanner({
    params: {
      cookiesUrl,
      policies,
      cookiesPreferencesSetKey,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};

const deleteAllCookies = () => {
  const allCookies = {};
  document.cookie.split(";").forEach((cookie) => {
    const parts = cookie.trim().split("=");
    allCookies[parts[0]] = parts[1];
  });
  Object.keys(allCookies).forEach((key) => {
    document.cookie = `${encodeURIComponent(key)}=`;
  });
};

export const Accept = Template.bind({});
Accept.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};
Accept.play = async ({ canvasElement }) => {
  deleteAllCookies();

  const cookies = new Cookies();

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

  deleteAllCookies();
};

export const Reject = Template.bind({});
Reject.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};
Reject.play = async ({ canvasElement }) => {
  deleteAllCookies();

  const cookies = new Cookies();

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

  deleteAllCookies();
};

export const CustomPolicies = Template.bind({});
CustomPolicies.args = {
  cookiesUrl: "#",
  policies: "custom",
  classes: "tna-cookie-banner--demo",
};
CustomPolicies.parameters = {
  chromatic: { disableSnapshot: true },
};
CustomPolicies.play = async ({ args, canvasElement }) => {
  deleteAllCookies();

  const cookies = new Cookies(args.policies.split(","));

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("custom")).toEqual(false);

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  await userEvent.click(acceptButton);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(true);
  await expect(cookies.isPolicyAccepted("custom")).toEqual(true);

  deleteAllCookies();
};

// export const EventHandling = Template.bind({});
// EventHandling.args = {
//   cookiesUrl: "#",
//   policies: "custom",
//   classes: "tna-cookie-banner--demo",
// };
// EventHandling.play = async ({ args, canvasElement }) => {
//   deleteAllCookies();

//   const cookies = new Cookies();

//   const onChangePolicy = jest.fn(data => {
//     console.log(data)
//   })
//   cookies.on("changePolicy", onChangePolicy)

//   const canvas = within(canvasElement);
//   const acceptButton = canvas.getByText("Accept cookies");
//   await userEvent.click(acceptButton);

//   await expect(onChangePolicy.mock).toHaveBeenCalledTimes(1);
//   await expect(onChangePolicy.mock.calls).toHaveLength(1);
//   await expect(onChangePolicy.mock.results[0].value).toHaveProperty("custom");
//   await expect(onChangePolicy.mock.results[0].value.custom).toEqual(true);

//   deleteAllCookies();
// };
