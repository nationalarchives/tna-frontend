import "../src/nationalarchives/all.scss";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

document.documentElement.classList.add("tna-template");
document.documentElement.classList.add("tna-template--system-theme");
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

const customViewports = {
  ...INITIAL_VIEWPORTS,
  // kindleFire2: {
  //   name: "Kindle Fire 2",
  //   styles: {
  //     width: "600px",
  //     height: "963px",
  //   },
  // },
  // kindleFireHD: {
  //   name: "Kindle Fire HD",
  //   styles: {
  //     width: "533px",
  //     height: "801px",
  //   },
  // },
};

export const parameters = {
  actions: {
    disable: true,
  },
  viewport: { viewports: customViewports },
};
