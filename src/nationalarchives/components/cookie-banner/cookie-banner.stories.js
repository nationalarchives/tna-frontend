import CookieBanner from "./template.njk";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "@storybook/test";
import Cookies from "../../lib/cookies.mjs";

const argTypes = {
  serviceName: { control: "text" },
  cookiesUrl: { control: "text" },
  policies: { control: "text" },
  policiesKey: { control: "text" },
  preferencesSetKey: { control: "text" },
  cookiesDomain: { control: "text" },
  cookiesPath: { control: "text" },
  allowInsecure: { control: "boolean" },
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
  policies,
  policiesKey,
  preferencesSetKey,
  cookiesDomain,
  cookiesPath,
  allowInsecure,
  style,
  classes,
  attributes,
}) =>
  CookieBanner({
    params: {
      serviceName,
      cookiesUrl,
      policies,
      policiesKey,
      preferencesSetKey,
      cookiesDomain,
      cookiesPath,
      allowInsecure,
      style,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  cookiesUrl: "#",
  classes: "tna-cookie-banner--demo",
};

export const Accept = Template.bind({});
Accept.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  allowInsecure: true,
  style: "contrast",
  classes: "tna-cookie-banner--demo",
};
Accept.play = async ({ canvasElement }) => {
  const cookies = new window.TNAFrontend.Cookies();
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

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
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("true");
  await expect(cookies.hasValue("cookie_preferences_set", "true")).toEqual(
    true,
  );
  await expect(acceptButton).not.toBeVisible();
  await expect(rejectButton).not.toBeVisible();

  // const closeButton = canvas.getByText("Close this message");
  // await expect(closeButton).toBeVisible();
  // await userEvent.click(closeButton);

  // await expect(closeButton).not.toBeVisible();
};

export const Reject = Template.bind({});
Reject.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  style: "contrast",
  classes: "tna-cookie-banner--demo",
};
Reject.play = async ({ canvasElement }) => {
  const cookies = new Cookies();
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

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
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("true");
  await expect(cookies.hasValue("cookie_preferences_set", "true")).toEqual(
    true,
  );
  await expect(acceptButton).not.toBeVisible();
  await expect(rejectButton).not.toBeVisible();

  await cookies.deleteAll();
};

export const CustomPolicies = Template.bind({});
CustomPolicies.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  policies: "custom",
  style: "contrast",
  classes: "tna-cookie-banner--demo",
};
CustomPolicies.parameters = {
  chromatic: { disableSnapshot: true },
};
CustomPolicies.play = async ({ args, canvasElement }) => {
  const cookies = new Cookies(args.policies.split(","));
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("custom")).toEqual(false);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(false);

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  await userEvent.click(acceptButton);

  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(true);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(true);
  await expect(cookies.isPolicyAccepted("custom")).toEqual(true);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("true");
  await expect(cookies.hasValue("cookie_preferences_set", "true")).toEqual(
    true,
  );

  await cookies.deleteAll();
};

export const Existing = Template.bind({});
Existing.args = {
  serviceName: "My service",
  cookiesUrl: "#",
  allowInsecure: true,
  style: "contrast",
  classes: "tna-cookie-banner--demo",
};
Existing.decorators = [
  (Story) => {
    const cookies = new Cookies();
    cookies.set("cookie_preferences_set", true);
    return Story();
  },
];
Existing.play = async ({ canvasElement }) => {
  const cookies = new Cookies();
  await expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  await expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  await expect(cookies.isPolicyAccepted("settings")).toEqual(false);
  await expect(cookies.isPolicyAccepted("unknown")).toEqual(null);
  await expect(cookies.exists("cookie_preferences_set")).toEqual(true);
  await expect(cookies.get("cookie_preferences_set")).toEqual("true");
  await expect(cookies.hasValue("cookie_preferences_set", "true")).toEqual(
    true,
  );

  const canvas = within(canvasElement);
  const acceptButton = canvas.getByText("Accept cookies");
  const rejectButton = canvas.getByText("Reject cookies");
  await expect(acceptButton).not.toBeVisible();
  await expect(rejectButton).not.toBeVisible();

  await cookies.deleteAll();
};

// export const EventHandling = Template.bind({});
// EventHandling.args = {
//   serviceName: "My service",
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
