import { describe, expect, test, beforeEach } from "@jest/globals";
import { EventTracker, GA4 } from "../src/nationalarchives/analytics.mjs";
import { addCookiesToDocument } from "./cookies.test";
import { valueGetters } from "../src/nationalarchives/lib/analytics-helpers.mjs";

addCookiesToDocument(document);

describe("Initialisation", () => {
  beforeEach(() => {
    GA4._instance = null;
    document.head.innerHTML = "";
  });

  test("EventTracker", async () => {
    const eventTracker = new EventTracker();

    expect(eventTracker).toBeTruthy();
    expect(eventTracker.start).toBeTruthy();
    expect(eventTracker.events).toBeTruthy();
  });

  test("GA4", async () => {
    document.cookie =
      "cookies_policy=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";

    expect(window.dataLayer).toEqual(undefined);

    const id = "example";
    const ga4 = new GA4({ id });

    expect(ga4.gTagId).toEqual(id);
    expect(window.dataLayer).toBeTruthy();
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toHaveProperty("event", "gtm.js");
    expect(window.dataLayer[0]).toHaveProperty(["gtm.start"]);
    expect(window.dataLayer[0]["gtm.start"]).toBeTruthy();
    const scripts = document.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute("src")).toEqual(
      `https://www.googletagmanager.com/gtm.js?id=${ga4.gTagId}&l=dataLayer`,
    );
  });

  test("GA4 without adding tracking code", async () => {
    document.cookie =
      "cookies_policy=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";

    const id = "example";
    new GA4({ id, addTrackingCode: false });

    const scripts = document.querySelectorAll("script");
    expect(scripts).toHaveLength(0);
  });

  // TODO
  // test("Init all", async () => {
  // });

  // TODO
  // test("Don't init all", async () => {
  // });
});

describe("With consent", () => {
  let ga4;
  let $container;
  let $heading;
  let $targetEl1;
  let $targetEl2;

  beforeEach(() => {
    window.dataLayer = [];
    document.clearAllCookies();
    document.cookie =
      "cookies_policy=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";
    window.TNAFrontendAnalyticsGA4 = null;
    document.head.innerHTML = "";
    document.body.innerHTML = "";

    ga4 = new GA4({ id: "example" });

    $container = document.createElement("div");
    $heading = document.createElement("h3");
    $targetEl1 = document.createElement("button");
    $targetEl2 = document.createElement("button");

    $container.classList.add("container-el");

    $heading.innerText = "Heading";

    $targetEl1.classList.add("target-el-1");
    $targetEl1.innerText = "Target 1";
    $targetEl1.setAttribute("aria-expanded", true);

    $targetEl2.classList.add("target-el-1");
    $targetEl2.innerText = "Target 2";
    $targetEl2.setAttribute("aria-expanded", false);

    $container.appendChild($heading);
    $container.appendChild($targetEl1);
    $container.appendChild($targetEl2);
    document.body.appendChild($container);
  });

  test("Script element added", async () => {});

  test("Add a listener by class", async () => {
    const prefix = ga4.prefix;
    const area = "test";
    const eventName = "button.click";
    const scope = ".target-el-1";

    ga4.addListeners(scope, area, [{ eventName, on: "click" }]);

    expect(window.dataLayer.length).toEqual(1);

    $targetEl1.click();
    expect(window.dataLayer.length).toEqual(2);

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("event", `${prefix}.${area}.${eventName}`);
    expect(lastEvent).toHaveProperty([`${prefix}.event.areaName`], area);
    expect(lastEvent).toHaveProperty([`${prefix}.event.group`], null);
    expect(lastEvent).toHaveProperty([`${prefix}.event.index`], 1);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.name`],
      `${prefix}.${area}.${eventName}`,
    );
    expect(lastEvent).toHaveProperty([`${prefix}.event.scope`], scope);
    expect(lastEvent).toHaveProperty([`${prefix}.event.state`], null);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.targetElement`],
      undefined,
    );
    expect(lastEvent).toHaveProperty([`${prefix}.event.timeSincePageLoad`]);
    expect(lastEvent).toHaveProperty([`${prefix}.event.value`], null);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.xPath`],
      "BODY/DIV[1]/BUTTON[1]",
    );
  });

  test("Add a listener by element", async () => {
    const prefix = ga4.prefix;
    const area = "test";
    const eventName = "button.click";

    ga4.addListeners($targetEl1, area, [{ eventName, on: "click" }]);

    expect(window.dataLayer.length).toEqual(1);

    $targetEl1.click();
    expect(window.dataLayer.length).toEqual(2);

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("event", `${prefix}.${area}.${eventName}`);
    expect(lastEvent).toHaveProperty([`${prefix}.event.areaName`], area);
    expect(lastEvent).toHaveProperty([`${prefix}.event.group`], null);
    expect(lastEvent).toHaveProperty([`${prefix}.event.index`], 1);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.name`],
      `${prefix}.${area}.${eventName}`,
    );
    expect(lastEvent).toHaveProperty([`${prefix}.event.scope`]);
    expect(lastEvent).toHaveProperty([`${prefix}.event.state`], null);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.targetElement`],
      undefined,
    );
    expect(lastEvent).toHaveProperty([`${prefix}.event.timeSincePageLoad`]);
    expect(lastEvent).toHaveProperty([`${prefix}.event.value`], null);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.xPath`],
      "BODY/DIV[1]/BUTTON[1]",
    );
  });

  test("Add a listener to elements inside the scope", async () => {
    const prefix = ga4.prefix;
    const area = "test";
    const eventName = "button.click";
    const targetElement = ".target-el-1";

    ga4.addListeners($container, area, [
      { eventName, on: "click", targetElement },
    ]);

    expect(window.dataLayer.length).toEqual(1);

    $targetEl1.click();
    expect(window.dataLayer.length).toEqual(2);

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("event", `${prefix}.${area}.${eventName}`);
    expect(lastEvent).toHaveProperty([`${prefix}.event.areaName`], area);
    expect(lastEvent).toHaveProperty([`${prefix}.event.group`], null);
    expect(lastEvent).toHaveProperty([`${prefix}.event.index`], 1);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.name`],
      `${prefix}.${area}.${eventName}`,
    );
    expect(lastEvent).toHaveProperty([`${prefix}.event.scope`]);
    expect(lastEvent).toHaveProperty([`${prefix}.event.state`], null);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.targetElement`],
      targetElement,
    );
    expect(lastEvent).toHaveProperty([`${prefix}.event.timeSincePageLoad`]);
    expect(lastEvent).toHaveProperty([`${prefix}.event.value`], null);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.xPath`],
      "BODY/DIV[1]/BUTTON[1]",
    );
  });

  test("Add a listener with dynamic data", async () => {
    const prefix = ga4.prefix;
    const area = "test";
    const eventName = "button.click";
    const targetElement = "button";

    ga4.addListeners($container, area, [
      {
        eventName,
        on: "click",
        targetElement,
        data: {
          value: valueGetters.text,
          index: valueGetters.index,
          state: valueGetters.expanded,
        },
      },
    ]);

    $targetEl1.click();

    const targetEl1Event = window.dataLayer[window.dataLayer.length - 1];
    expect(targetEl1Event).toHaveProperty([`${prefix}.event.index`], 1);
    expect(targetEl1Event).toHaveProperty([`${prefix}.event.state`], "opened");
    expect(targetEl1Event).toHaveProperty(
      [`${prefix}.event.value`],
      "Target 1",
    );

    $targetEl2.click();

    const targetEl2Event = window.dataLayer[window.dataLayer.length - 1];
    expect(targetEl2Event).toHaveProperty([`${prefix}.event.index`], 2);
    expect(targetEl2Event).toHaveProperty([`${prefix}.event.state`], "closed");
    expect(targetEl2Event).toHaveProperty(
      [`${prefix}.event.value`],
      "Target 2",
    );
  });

  test("Add a listener with a root event name", async () => {
    const prefix = ga4.prefix;
    const area = "test";
    const eventName = "button.click";
    const rootEventName = "root_event";
    const scope = ".target-el-1";

    ga4.addListeners(scope, area, [{ eventName, on: "click", rootEventName }]);

    $targetEl1.click();

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("event", `${prefix}.${rootEventName}`);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.name`],
      `${prefix}.${area}.${eventName}`,
    );
  });

  test("Add a listener with a global root event name", async () => {
    const prefix = ga4.prefix;
    const area = "test";
    const eventName = "button.click";
    const rootEventName = "root_event";
    const scope = ".target-el-1";

    ga4.addListeners(scope, area, [{ eventName, on: "click" }], rootEventName);

    $targetEl1.click();

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("event", `${prefix}.${rootEventName}`);
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.name`],
      `${prefix}.${area}.${eventName}`,
    );
  });

  test("Add a listener with root data", async () => {
    const area = "test";
    const eventName = "button.click";
    const scope = ".target-el-1";

    ga4.addListeners(scope, area, [
      { eventName, on: "click", rootData: { foo: "bar" } },
    ]);

    $targetEl1.click();

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("foo", "bar");
  });

  test("Add a listener with default root data", async () => {
    const area = "test";
    const eventName = "button.click";
    const scope = ".target-el-1";

    ga4.addListeners(scope, area, [{ eventName, on: "click" }], null, {
      foo: "bar",
    });

    $targetEl1.click();

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty("foo", "bar");
  });

  test("Add a listener with a custom prefix", async () => {
    ga4.destroy();
    const prefix = "custom";
    const ga4_custom = new GA4({ id: "example", prefix });
    const area = "test";
    const eventName = "button.click";
    const scope = ".target-el-1";

    ga4_custom.addListeners(scope, area, [
      { eventName, on: "click", rootData: { foo: "bar" } },
    ]);

    $targetEl1.click();

    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    expect(lastEvent).toHaveProperty(
      [`${prefix}.event.name`],
      `${prefix}.${area}.${eventName}`,
    );
  });
});

// TODO
// describe("Without consent", () => {
//   test("Script element not added", async () => {
//     expect(false).toBeTruthy();
//   })
// })

// TODO
// describe("Accepting cookies", () => {
//   test("Tracking enabled", async () => {
//     expect(false).toBeTruthy();
//   })
// })

// TODO
// describe("Rejecting cookies", () => {
//   test("Tracking disabled", async () => {
//     expect(false).toBeTruthy();
//   })
// })
