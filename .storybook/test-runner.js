import { a11yConfig } from "./storybook-config";
import { customViewports } from "./viewports";

const { getStoryContext, getJestConfig } = require("@storybook/test-runner");
const { injectAxe, checkA11y } = require("axe-playwright");

const DEFAULT_VP_SIZE = { width: 1280, height: 720 };

module.exports = {
  ...getJestConfig(),
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    const vpName = context.parameters?.viewport?.defaultViewport;
    const vpParams = customViewports[vpName];

    if (vpParams) {
      const vpSize = Object.entries(vpParams.styles).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          [screen]: parseInt(size),
        }),
        {},
      );

      page.setViewportSize(vpSize);
    } else {
      page.setViewportSize(DEFAULT_VP_SIZE);
    }
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, "#storybook-root", a11yConfig, "v2");
  },
};
