// https://storybook.js.org/addons/@storybook/test-runner

// const { toMatchImageSnapshot } = require("jest-image-snapshot");
// const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

// module.exports = {
//   setup() {
//     expect.extend({ toMatchImageSnapshot });
//   },
//   async postRender(page, context) {
//     // the #root element wraps the story. From Storybook 7.0 onwards, the selector should be #storybook-root
//     const elementHandler = await page.$("#storybook-root");
//     const innerHTML = await elementHandler.innerHTML();
//     expect(innerHTML).toMatchSnapshot();

//     // If you want to take screenshot of multiple browsers, use
//     // page.context().browser().browserType().name() to get the browser name to prefix the file name
//     const image = await page.screenshot();
//     expect(image).toMatchImageSnapshot({
//       customSnapshotsDir,
//       customSnapshotIdentifier: context.id,
//     });
//   },
// };

// const { getStoryContext } = require('@storybook/test-runner');
// const { injectAxe, checkA11y, configureAxe } = require('axe-playwright');

// module.exports = {
//   async preRender(page, context) {
//     await injectAxe(page);
//   },
//   async postRender(page, context) {
//     // Get entire context of a story, including parameters, args, argTypes, etc.
//     const storyContext = await getStoryContext(page, context);

//     // Do not test a11y for stories that disable a11y
//     if (storyContext.parameters?.a11y?.disable) {
//       return;
//     }

//     // Apply story-level a11y rules
//     await configureAxe(page, {
//       rules: storyContext.parameters?.a11y?.config?.rules,
//     });

//     // from Storybook 7.0 onwards, the selector should be #storybook-root
//     await checkA11y(page, '#root', {
//       detailedReport: true,
//       detailedReportOptions: {
//         html: true,
//       },
//       // pass axe options defined in @storybook/addon-a11y
//       axeOptions: storyContext.parameters?.a11y?.options,
//     });
//   },
// };

import { a11yConfig } from "./storybook-config";
import { customViewports } from "./viewports";

const { getStoryContext } = require("@storybook/test-runner");
const { injectAxe, checkA11y } = require("axe-playwright");

const DEFAULT_VP_SIZE = { width: 1280, height: 720 };

module.exports = {
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
  testTimeout: 30000,
};
