import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

export default {
  title: "Components/Panel",
  argTypes: Object.fromEntries(
    Object.entries({
      title: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: { control: "inline-radio", options: ["s", "m", "l", "xl"] },
      body: { control: "text" },
      text: { control: "text" },
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
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    title: "Application received",
    body: "<p>Your application has been received and is being processed.</p><p>Your reference number is <strong>123456</strong>.</p>",
    headingLevel: 1,
  },
};
