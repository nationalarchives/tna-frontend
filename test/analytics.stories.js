import { expect, spyOn } from "storybook/test";
import Cookies from "@nationalarchives/cookies/src/index.js";
import { EventTracker, GA4 } from "../src/nationalarchives/analytics.mjs";
import { valueGetters } from "../src/nationalarchives/lib/analytics-helpers.mjs";

export default {
  title: "Tests/Analytics",
  render: () => "",
  beforeEach: () => {
    const cookies = new Cookies();
    const previousCookies = cookies.all;
    const previousTracker = window.TNAFrontendAnalyticsGA4;
    const previousDataLayer = window.dataLayer;
    const previousDisabled = window["ga-disable-example"];
    const firstScript = document.querySelector("script");
    // Inspect tracking script insertion without sending requests to Google.
    const insertScript = firstScript
      ? spyOn(firstScript.parentNode, "insertBefore").mockImplementation(
          (node) => node,
        )
      : spyOn(document.head, "appendChild").mockImplementation((node) => node);

    return () => {
      insertScript.mockRestore();
      window.TNAFrontendAnalyticsGA4 = previousTracker;
      window.dataLayer = previousDataLayer;
      window["ga-disable-example"] = previousDisabled;
      for (const key of [
        "cookie_preferences",
        "cookie_preferences_set",
        "ga-disable-example",
      ]) {
        if (Object.hasOwn(previousCookies, key)) {
          cookies.set(key, previousCookies[key]);
        } else {
          cookies.delete(key);
        }
      }
    };
  },
};

export const Initialisation = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ step }) => {
    const test = async (name, run) =>
      step(name, async () => {
        window.TNAFrontendAnalyticsGA4 = null;
        delete window.dataLayer;
        await run();
      });

    await test("EventTracker", async () => {
      const eventTracker = new EventTracker();

      expect(eventTracker).toBeTruthy();
      expect(eventTracker.start).toBeTruthy();
      expect(eventTracker.events).toBeTruthy();
    });

    await test("GA4", async () => {
      document.cookie =
        "cookie_preferences=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";

      expect(window.dataLayer).toEqual(undefined);

      const id = "example";
      const ga4 = new GA4({ id });

      expect(ga4.gTagId).toEqual(id);
      expect(window.dataLayer).toBeTruthy();
      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toHaveProperty("event", "gtm.js");
      expect(window.dataLayer[0]).toHaveProperty(["gtm.start"]);
      expect(window.dataLayer[0]["gtm.start"]).toBeTruthy();
      const firstScript = document.querySelector("script");
      const insertScript = firstScript
        ? firstScript.parentNode.insertBefore
        : document.head.appendChild;
      expect(insertScript).toHaveBeenCalledTimes(1);
      expect(insertScript.mock.calls[0][0].getAttribute("src")).toEqual(
        `https://www.googletagmanager.com/gtm.js?id=${ga4.gTagId}&l=dataLayer`,
      );
    });

    await test("GA4 without adding tracking code", async () => {
      document.cookie =
        "cookie_preferences=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";

      const firstScript = document.querySelector("script");
      const insertScript = firstScript
        ? firstScript.parentNode.insertBefore
        : document.head.appendChild;
      insertScript.mockClear();
      const id = "example";
      new GA4({ id, addTrackingCode: false });

      expect(insertScript).not.toHaveBeenCalled();
    });

    // TODO
    // test("Init all", async () => {
    // });

    // TODO
    // test("Don't init all", async () => {
    // });
  },
};

export const WithConsent = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement, step }) => {
    let ga4;
    let $container;
    let $heading;
    let $targetEl1;
    let $targetEl2;

    const test = async (name, run) =>
      step(name, async () => {
        window.dataLayer = [];
        document.cookie =
          "cookie_preferences=%7B%22usage%22%3Atrue%2C%22settings%22%3Atrue%2C%22essential%22%3Atrue%7D";
        window.TNAFrontendAnalyticsGA4 = null;
        canvasElement.replaceChildren();

        ga4 = new GA4({ id: "example", initAll: false });

        $container = document.createElement("div");
        $heading = document.createElement("h3");
        $targetEl1 = document.createElement("button");
        $targetEl2 = document.createElement("button");

        $container.classList.add("container-el");
        $container.id = "analytics-test-fixture";
        ga4.document = $container;

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
        canvasElement.appendChild($container);
        await run();
      });

    await test("Add a listener by class", async () => {
      const prefix = ga4.prefix;
      const area = "test";
      const eventName = "button.click";
      const scope = ".target-el-1";

      ga4.addListeners(scope, area, [{ eventName, on: "click" }]);

      expect(window.dataLayer.length).toEqual(1);

      $targetEl1.click();
      expect(window.dataLayer.length).toEqual(2);

      const lastEvent = window.dataLayer[window.dataLayer.length - 1];
      expect(lastEvent).toHaveProperty(
        "event",
        `${prefix}.${area}.${eventName}`,
      );
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
        'id("analytics-test-fixture")/BUTTON[1]',
      );
    });

    await test("Add a listener by element", async () => {
      const prefix = ga4.prefix;
      const area = "test";
      const eventName = "button.click";

      ga4.addListeners($targetEl1, area, [{ eventName, on: "click" }]);

      expect(window.dataLayer.length).toEqual(1);

      $targetEl1.click();
      expect(window.dataLayer.length).toEqual(2);

      const lastEvent = window.dataLayer[window.dataLayer.length - 1];
      expect(lastEvent).toHaveProperty(
        "event",
        `${prefix}.${area}.${eventName}`,
      );
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
        'id("analytics-test-fixture")/BUTTON[1]',
      );
    });

    await test("Add a listener to elements inside the scope", async () => {
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
      expect(lastEvent).toHaveProperty(
        "event",
        `${prefix}.${area}.${eventName}`,
      );
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
        'id("analytics-test-fixture")/BUTTON[1]',
      );
    });

    await test("Add a listener with dynamic data", async () => {
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
      expect(targetEl1Event).toHaveProperty(
        [`${prefix}.event.state`],
        "opened",
      );
      expect(targetEl1Event).toHaveProperty(
        [`${prefix}.event.value`],
        "Target 1",
      );

      $targetEl2.click();

      const targetEl2Event = window.dataLayer[window.dataLayer.length - 1];
      expect(targetEl2Event).toHaveProperty([`${prefix}.event.index`], 2);
      expect(targetEl2Event).toHaveProperty(
        [`${prefix}.event.state`],
        "closed",
      );
      expect(targetEl2Event).toHaveProperty(
        [`${prefix}.event.value`],
        "Target 2",
      );
    });

    await test("Add a listener with a root event name", async () => {
      const prefix = ga4.prefix;
      const area = "test";
      const eventName = "button.click";
      const rootEventName = "root_event";
      const scope = ".target-el-1";

      ga4.addListeners(scope, area, [
        { eventName, on: "click", rootEventName },
      ]);

      $targetEl1.click();

      const lastEvent = window.dataLayer[window.dataLayer.length - 1];
      expect(lastEvent).toHaveProperty("event", `${prefix}.${rootEventName}`);
      expect(lastEvent).toHaveProperty(
        [`${prefix}.event.name`],
        `${prefix}.${area}.${eventName}`,
      );
    });

    await test("Add a listener with a global root event name", async () => {
      const prefix = ga4.prefix;
      const area = "test";
      const eventName = "button.click";
      const rootEventName = "root_event";
      const scope = ".target-el-1";

      ga4.addListeners(
        scope,
        area,
        [{ eventName, on: "click" }],
        rootEventName,
      );

      $targetEl1.click();

      const lastEvent = window.dataLayer[window.dataLayer.length - 1];
      expect(lastEvent).toHaveProperty("event", `${prefix}.${rootEventName}`);
      expect(lastEvent).toHaveProperty(
        [`${prefix}.event.name`],
        `${prefix}.${area}.${eventName}`,
      );
    });

    await test("Add a listener with root data", async () => {
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

    await test("Add a listener with default root data", async () => {
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

    await test("Add a listener with a custom prefix", async () => {
      ga4.destroy();
      const prefix = "custom";
      const ga4_custom = new GA4({ id: "example", prefix, initAll: false });
      ga4_custom.document = $container;
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
  },
};

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
