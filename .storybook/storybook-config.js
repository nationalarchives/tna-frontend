import axe from "axe-core";

const enableRulesByTag = (tags = []) => {
  const allRules = axe.getRules();
  return allRules.map((rule) =>
    tags.some((t) => rule.tags.includes(t))
      ? { id: rule.ruleId, enabled: true }
      : { id: rule.ruleId, enabled: false },
  );
};

const checkAAA = false;
export const a11yConfig = {
  rules: [
    ...enableRulesByTag([
      "wcag2a",
      "wcag21a",
      "wcag22a",
      "wcag2aa",
      "wcag21aa",
      "wcag22aa",
      ...(checkAAA ? ["wcag2aaa", "wcag21aaa", "wcag22aaa"] : []),
      "best-practice",
    ]),
    {
      id: "region",
      enabled: false,
    },
  ],
  axeOptions: {
    selectors: true,
    frameWaitTime: 15000,
    absolutePaths: true,
    elementRef: true,
  },
  verbose: false,
};
