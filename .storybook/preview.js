import "../src/nationalarchives/all.scss";
import { a11yConfig } from "./storybook-config";
import { customViewports } from "./viewports";
// import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

document.documentElement.classList.add(
  "tna-template",
  // "tna-template--system-theme",
);
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

export const parameters = {
  actions: {
    disable: true,
  },
  viewport: { viewports: customViewports },
  options: { showPanel: true },
  a11y: {
    config: a11yConfig,
  },
  // backgrounds: { disable: true },
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
