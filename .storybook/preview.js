import "../src/nationalarchives/all.scss";
import { a11yConfig } from "./storybook-config";
// import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

document.documentElement.classList.add(
  "tna-template",
  // "tna-template--system-theme",
);
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

const customViewports = {
  // ...MINIMAL_VIEWPORTS,
  // largeMin: {
  //   name: "Smallest large device",
  //   styles: {
  //     width: "1025px",
  //     height: "800px",
  //   },
  // },
  // mediumMax: {
  //   name: "Largest medium device",
  //   styles: {
  //     width: "1024px",
  //     height: "800px",
  //   },
  // },
  // mediumMin: {
  //   name: "Smallest medium device",
  //   styles: {
  //     width: "769px",
  //     height: "800px",
  //   },
  // },
  // smallMax: {
  //   name: "Largest small device",
  //   styles: {
  //     width: "768px",
  //     height: "800px",
  //   },
  // },
  // smallMin: {
  //   name: "Smallest small device",
  //   styles: {
  //     width: "481px",
  //     height: "800px",
  //   },
  // },
  // tinyMax: {
  //   name: "Largest tiny device",
  //   styles: {
  //     width: "480px",
  //     height: "800px",
  //   },
  // },
  medium: {
    name: "Medium device",
    styles: {
      width: "896px",
      height: "800px",
    },
  },
  small: {
    name: "Small device",
    styles: {
      width: "624px",
      height: "800px",
    },
  },
  tiny: {
    name: "Tiny device",
    styles: {
      width: "400px",
      height: "800px",
    },
  },
};

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
};
