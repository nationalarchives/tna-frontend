import "../src/nationalarchives/all.scss";
import axe from "axe-core";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

// Also need to change $support-colour-schemes in src/nationalarchives/_features.scss
export const supportDynamicColourSchemes = false;
document.documentElement.classList.add(
  "tna-template",
  supportDynamicColourSchemes
    ? "tna-template--system-theme"
    : "tna-template--light-theme",
);
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

const enableRulesByTag = (tags = []) => {
  const allRules = axe.getRules();
  return allRules.map((rule) =>
    tags.some((t) => rule.tags.includes(t))
      ? { id: rule.ruleId, enabled: true }
      : { id: rule.ruleId, enabled: false },
  );
};

const checkWCAG21AAA = false;

export const parameters = {
  actions: {
    disable: true,
  },
  viewport: { viewports: customViewports },
  options: { showPanel: true },
  a11y: {
    config: {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      rules: enableRulesByTag([
        "wcag2a",
        "wcag21a",
        "wcag2aa",
        "wcag21aa",
        ...(checkWCAG21AAA ? ["wcag2aaa", "wcag21aaa"] : []),
      ]),
    },
  },
};
