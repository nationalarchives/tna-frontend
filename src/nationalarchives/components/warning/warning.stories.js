import Warning from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Warning",
  argTypes: Object.fromEntries(
    Object.entries({
      heading: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      body: { control: "text" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
      },
    ]),
  ),
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Warning, { params });
  },
};

export const Standard = {
  args: {
    headingLevel: 2,
    body: "Please note this page references hunger strikes and force feeding, which some people may find upsetting.",
    classes: "tna-warning--demo",
  },
};
