import "../src/nationalarchives/all.scss";
import { a11yConfig } from "./storybook-config";
import { customViewports } from "./viewports";
import Cookies from "../src/nationalarchives/lib/cookies.mjs";
// import isChromatic from "chromatic/isChromatic";

document.documentElement.classList.add(
  "tna-template",
  "tna-template--yellow-accent",
);
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

export const parameters = {
  actions: {
    // disable: true,
  },
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
    window.TNAFrontend = {
      Cookies,
    };
    const cookies = new Cookies();
    cookies.deleteAll();
    cookies.destroy();
    return Story();
  },
];

// const fontLoader = async () => ({
//   fonts: await Promise.all([
//     document.fonts.load("normal 1em Open Sans"),
//     document.fonts.load("bold 1em Open Sans"),
//     document.fonts.load("normal 1em Roboto Mono"),
//   ]),
// });

// export const loaders = isChromatic() && document.fonts ? [fontLoader] : [];
