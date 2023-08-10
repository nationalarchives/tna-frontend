import axe from "axe-core";

const enableRulesByTag = (tags = []) => {
  const allRules = axe.getRules();
  return allRules.map((rule) =>
    tags.some((t) => rule.tags.includes(t))
      ? { id: rule.ruleId, enabled: true }
      : { id: rule.ruleId, enabled: false },
  );
};

const checkWCAG21AAA = false;
export const a11yConfig = {
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
};
