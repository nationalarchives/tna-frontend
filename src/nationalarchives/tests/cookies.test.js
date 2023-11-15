import { jest, describe, expect, test, afterEach } from "@jest/globals";
import { TextEncoder, TextDecoder, store, options } from "util";
import Cookies from "../lib/cookies.mjs";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.store = store;
global.options = options;

const addCookiesToDocument = (document) => {
  let _cookies = {};
  document.__defineGetter__("cookie", () => {
    return Object.keys(_cookies)
      .map((key) => `${key}=${_cookies[key]}`)
      .join(";");
  });
  document.__defineSetter__("cookie", (s) => {
    const indexOfSeparator = s.indexOf("=");
    const key = s.substr(0, indexOfSeparator);
    const value = s.substring(indexOfSeparator + 1);
    _cookies[key] = value;
    return `${key}=${value}`;
  });
  document.clearAllCookies = () => {
    _cookies = {};
  };
};

addCookiesToDocument(document);

describe("No existing cookies", () => {
  afterEach(() => {
    const cookies = new Cookies();
    cookies.destroy();
    document.clearAllCookies();
  });

  test("Initialisation", async () => {
    expect(document.cookie).toEqual("");

    const cookies = new Cookies();
    expect(cookies).toHaveProperty("all");
    expect(cookies).toBeInstanceOf(Cookies);

    expect(document.cookie).not.toEqual("");
  });

  test("Destruction", async () => {
    const cookies = new Cookies();

    expect(Cookies).toHaveProperty("_instance");
    expect(Cookies._instance).not.toEqual(null);

    cookies.destroy();

    expect(Cookies).toHaveProperty("_instance");
    expect(Cookies._instance).toEqual(null);
  });

  test("Singleton", async () => {
    const cookies1 = new Cookies();
    const cookies2 = new Cookies();

    expect(cookies1).toBe(cookies2);

    cookies1.destroy();
    const cookies3 = new Cookies();

    expect(cookies1).not.toBe(cookies3);
  });

  test("Getting/setting", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("get");
    expect(cookies).toHaveProperty("set");
    expect(cookies).toHaveProperty("exists");
    expect(cookies).toHaveProperty("hasValue");

    const testKey = "foo";
    const testValue = "bar";

    expect(cookies.all).not.toHaveProperty(testKey);
    expect(cookies.exists(testKey)).toEqual(false);

    cookies.set(testKey, testValue);

    expect(cookies.all).toHaveProperty(testKey);
    expect(cookies.all[testKey]).toEqual(testValue);
    expect(cookies.exists(testKey)).toEqual(true);
    expect(cookies.get(testKey)).toEqual(testValue);
    expect(cookies.hasValue(testKey, testValue)).toEqual(true);
    expect(cookies.hasValue(testKey, "different")).toEqual(false);
  });

  test("Deletion", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("delete");

    const testKey = "foo";
    const testValue = "bar";

    cookies.set(testKey, testValue);

    expect(cookies.all).toHaveProperty(testKey);
    expect(cookies.all[testKey]).toEqual(testValue);
    expect(cookies.exists(testKey)).toEqual(true);
    expect(cookies.get(testKey)).toEqual(testValue);

    cookies.delete(testKey);

    // expect(cookies.all).not.toHaveProperty(testKey);
    // expect(cookies.exists(testKey)).toEqual(false);
    expect(cookies.get(testKey)).toEqual("");
  });

  test("Deletion of all", async () => {
    const cookies = new Cookies();

    const testKeys = ["foo", "bar"];
    const testValue = "testValue";

    testKeys.forEach((testKey) => cookies.set(testKey, testValue));

    testKeys.forEach((testKey) => {
      expect(cookies.get(testKey)).toEqual(testValue);
    });

    cookies.deleteAll();

    testKeys.forEach((testKey) => {
      expect(cookies.get(testKey)).toEqual("");
    });
  });

  test("Initial policies", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("policies");

    expect(cookies.policies).toHaveProperty("essential");
    expect(cookies.policies.essential).toEqual(true);
    expect(JSON.parse(cookies.get("cookies_policy"))).toHaveProperty(
      "essential",
    );
    expect(cookies.policies).toHaveProperty("settings");
    expect(cookies.policies.settings).toEqual(false);
    expect(JSON.parse(cookies.get("cookies_policy"))).toHaveProperty(
      "settings",
    );
    expect(cookies.policies).toHaveProperty("usage");
    expect(cookies.policies.usage).toEqual(false);
    expect(JSON.parse(cookies.get("cookies_policy"))).toHaveProperty("usage");
  });

  test("Accept policy", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("isPolicyAccepted");

    expect(cookies.policies).toHaveProperty("essential");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies).toHaveProperty("settings");
    expect(cookies.policies.settings).toEqual(false);
    expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    expect(cookies.policies).toHaveProperty("usage");
    expect(cookies.policies.usage).toEqual(false);
    expect(cookies.isPolicyAccepted("usage")).toEqual(false);

    cookies.acceptPolicy("settings");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(true);
    expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    expect(cookies.policies.usage).toEqual(false);
    expect(cookies.isPolicyAccepted("usage")).toEqual(false);

    cookies.acceptPolicy("usage");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(true);
    expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    expect(cookies.policies.usage).toEqual(true);
    expect(cookies.isPolicyAccepted("usage")).toEqual(true);
  });

  test("Accept all policies", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("acceptAllPolicies");

    expect(cookies.policies).toHaveProperty("essential");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies).toHaveProperty("settings");
    expect(cookies.policies.settings).toEqual(false);
    expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    expect(cookies.policies).toHaveProperty("usage");
    expect(cookies.policies.usage).toEqual(false);
    expect(cookies.isPolicyAccepted("usage")).toEqual(false);

    cookies.acceptAllPolicies();
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(true);
    expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    expect(cookies.policies.usage).toEqual(true);
    expect(cookies.isPolicyAccepted("usage")).toEqual(true);
  });

  test("Reject policy", async () => {
    const cookies = new Cookies();

    cookies.acceptPolicy("settings");
    cookies.acceptPolicy("usage");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(true);
    expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    expect(cookies.policies.usage).toEqual(true);
    expect(cookies.isPolicyAccepted("usage")).toEqual(true);

    cookies.rejectPolicy("settings");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(false);
    expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    expect(cookies.policies.usage).toEqual(true);
    expect(cookies.isPolicyAccepted("usage")).toEqual(true);

    cookies.rejectPolicy("usage");
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(false);
    expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    expect(cookies.policies.usage).toEqual(false);
    expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  });

  test("Reject all policies", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("rejectAllPolicies");

    cookies.acceptAllPolicies();
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(true);
    expect(cookies.isPolicyAccepted("settings")).toEqual(true);
    expect(cookies.policies.usage).toEqual(true);
    expect(cookies.isPolicyAccepted("usage")).toEqual(true);

    cookies.rejectAllPolicies();
    expect(cookies.policies.essential).toEqual(true);
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
    expect(cookies.policies.settings).toEqual(false);
    expect(cookies.isPolicyAccepted("settings")).toEqual(false);
    expect(cookies.policies.usage).toEqual(false);
    expect(cookies.isPolicyAccepted("usage")).toEqual(false);
  });

  test("Protected essential policy", async () => {
    const cookies = new Cookies();

    expect(cookies.policies).toHaveProperty("essential");
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);

    cookies.acceptPolicy("essential");
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);

    cookies.rejectPolicy("essential");
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);

    cookies.rejectAllPolicies();
    expect(cookies.isPolicyAccepted("essential")).toEqual(true);
  });

  test("Events", async () => {
    const cookies = new Cookies();
    expect(cookies).toHaveProperty("on");

    const mockCallback = jest.fn();
    cookies.on("setCookie", mockCallback);
    const testKey = "foo";
    const testValue = "bar";

    cookies.set(testKey, testValue);

    expect(mockCallback.mock.calls).toHaveLength(1);
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      key: testKey,
      value: testValue,
      domain: "",
      path: "/",
      sameSite: "Lax",
      secure: true,
      maxAge: 31536000,
      cookie: `foo=bar; samesite=Lax; path=/; max-age=31536000; secure`,
    });

    cookies.set(testKey, "");

    expect(mockCallback.mock.calls).toHaveLength(2);
    expect(mockCallback.mock.calls[1][0]).toStrictEqual({
      key: testKey,
      value: "",
      domain: "",
      path: "/",
      sameSite: "Lax",
      secure: true,
      maxAge: 31536000,
      cookie: `foo=; samesite=Lax; path=/; max-age=31536000; secure`,
    });
  });
});
