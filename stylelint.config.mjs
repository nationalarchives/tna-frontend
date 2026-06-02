/** @type {import('stylelint').Config} */
export default {
  extends: ["@nationalarchives/stylelint-config"],
  rules: {
    "order/order": [
      [
        "dollar-variables",
        {
          type: "at-rule",
          name: "mixin",
          hasBlock: true,
        },
        {
          type: "at-rule",
          name: "include",
          parameter: "spacing",
        },
        {
          type: "at-rule",
          name: "include",
          parameter: "typography",
        },
        {
          type: "at-rule",
          name: "include",
          parameter: "colour",
        },
        {
          type: "at-rule",
          name: "include",
          parameter: "borders",
        },
        {
          type: "at-rule",
          name: "include",
          parameter: "a11y",
        },
        "custom-properties",
        "declarations",
        "rules",
        "at-rules",
        {
          type: "at-rule",
          name: "include",
          parameter: "media.on-.*",
          hasBlock: true,
        },
        {
          type: "at-rule",
          name: "include",
          parameter: "colour.on-.*",
          hasBlock: true,
        },
      ],
      {
        unspecified: "bottom",
      },
    ],
  },
};
