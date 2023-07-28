import "../src/nationalarchives/all.scss";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

document.documentElement.classList.add("tna-template");
// document.documentElement.classList.add("tna-template--system-theme");
document.documentElement.classList.add("tna-template--light-theme");
if (window.self !== window.top) {
  document.documentElement.classList.add("tna-template--padded");
}
document.body.classList.add("tna-template__body");

const customViewports = {
  ...MINIMAL_VIEWPORTS,
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
  options: { showPanel: true },
};
