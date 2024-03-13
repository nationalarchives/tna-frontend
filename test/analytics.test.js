import { describe, expect, test, beforeEach } from "@jest/globals";
import { EventTracker, GA4 } from "../src/nationalarchives/analytics.mjs";
import { addCookiesToDocument } from "./cookies.test";
import { valueGetters } from "../src/nationalarchives/lib/analytics-helpers.mjs";

addCookiesToDocument(document);

describe("Initialisation", () => {
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

    const id = "example-id";
    const ga4 = new GA4({ id });

    expect(ga4.gTagId).toEqual(id);
    expect(window.dataLayer).toBeTruthy();
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toHaveProperty("event", "gtm.js");
    expect(window.dataLayer[0]).toHaveProperty(["gtm.start"]);
    expect(window.dataLayer[0]["gtm.start"]).toBeTruthy();
  });
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
    GA4._instance = null;
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

    ga4.addListener(scope, area, [{ eventName, on: "click" }]);

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

    ga4.addListener($targetEl1, area, [{ eventName, on: "click" }]);

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

    ga4.addListener($container, area, [
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

    ga4.addListener($container, area, [
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

  // test("Add a listener with root data", async () => {
  //   expect(false).toBeTruthy();
  // })

  // test("Add a listener with a root event name", async () => {
  //   expect(false).toBeTruthy();
  // })
});

// describe("Without consent", () => {
//   beforeEach(() => {
//     window.dataLayer = undefined;
//     document.clearAllCookies();
//     document.cookie =
//       "cookies_policy=%7B%22usage%22%3Afalse%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";
//   });

//   afterEach(() => {
//     GA4._instance = null
//   });

//   test("Script element not added", async () => {
//     expect(false).toBeTruthy();
//   })
// })

// describe("Accepting cookies", () => {
//   beforeEach(() => {
//     window.dataLayer = undefined;
//     document.clearAllCookies();
//     document.cookie =
//       "cookies_policy=%7B%22usage%22%3Afalse%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";
//   });

//   afterEach(() => {
//     GA4._instance = null
//   });

//   test("Tracking enabled", async () => {
//     expect(false).toBeTruthy();
//   })
// })

// describe("Rejecting cookies", () => {
//   beforeEach(() => {
//     window.dataLayer = undefined;
//     document.clearAllCookies();
//     document.cookie =
//       "cookies_policy=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";
//   });

//   afterEach(() => {
//     GA4._instance = null
//   });

//   test("Tracking disabled", async () => {
//     expect(false).toBeTruthy();
//   })
// })
