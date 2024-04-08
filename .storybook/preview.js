import "../src/nationalarchives/all.scss";
import "../src/nationalarchives/font-awesome.scss";
import { a11yConfig } from "./storybook-config";
import { customViewports } from "./viewports";
import Cookies from "../src/nationalarchives/lib/cookies.mjs";

document.documentElement.classList.add(
  "tna-template",
  "tna-template--yellow-accent",
);
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

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

export const decorators = [
  (Story, ctx) => {
    window.dataLayer = [];
    const cookies = new Cookies();
    cookies.deleteAll();
    return Story();
  },
];
