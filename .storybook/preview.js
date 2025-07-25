import "../src/nationalarchives/all.scss";
import "../src/nationalarchives/font-awesome.scss";
import { a11yConfig } from "./storybook-config";
import { customViewports } from "./viewports";
import Cookies from "../src/nationalarchives/lib/cookies.mjs";
import { EventTracker, GA4 } from "../src/nationalarchives/analytics.mjs";

document.documentElement.classList.add(
  "tna-template",
  "tna-template--yellow-accent",
);
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

document.documentElement.dataset.tnaFrontendDebug = "true";

export const parameters = {
  actions: {},
  viewport: { viewports: customViewports },
  options: { showPanel: true },
  a11y: {
    config: a11yConfig,
  },
  backgrounds: {
    values: [],
    grid: {
      cellSize: 16,
      cellAmount: 4,
    },
  },
  controls: {
    expanded: true,
  },
};

class MockEventTracker extends EventTracker {
  constructor(documentScope) {
    super({ documentScope });
    this.initAll();
    console.log({
      ...this.getTnaMetaTags(),
      ...this.getUserPreferences(),
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
  }

  recordEvent(eventName, data, rootData = {}) {
    super.recordEvent(eventName, data, rootData);
    console.log("EventTracker", this.events[this.events.length - 1]);
  }
}

class MockGA4Tracking extends GA4 {
  constructor(documentScope) {
    super({ documentScope });
  }

  pushToDataLayer(data) {
    super.pushToDataLayer();
    console.log("GA4", data);
  }
}

export const decorators = [
  (Story, ctx) => {
    window.dataLayer = [];
    const cookies = new Cookies();
    cookies.deleteAll();
    const story = Story();
    if (window && ctx.args.disableMockAnalytics !== true) {
      setTimeout(() => {
        new MockEventTracker(ctx.canvasElement);
        new MockGA4Tracking(ctx.canvasElement);
      }, 1);
    }
    return story;
  },
];
