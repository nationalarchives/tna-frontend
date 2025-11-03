import Template from "./template.njk?raw";
import TextInput from "../text-input/template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Fieldset",
  argTypes: Object.fromEntries(
    Object.entries({
      legend: { control: "text" },
      headingLevel: { control: { type: "number", min: 1, max: 6 } },
      headingSize: {
        control: "inline-radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
      html: { control: "text" },
      id: { control: "text" },
      hint: { control: "text" },
      smallerHint: { control: "boolean" },
      error: { control: "object" },
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
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    legend: "Fieldset",
    headingLevel: 1,
    headingSize: "xl",
    html: Array(6)
      .fill("")
      .reduce(
        (prev, value, index) =>
          prev +
          nunjucks.renderString(TextInput, {
            params: {
              label: "Text input",
              headingLevel: 2,
              headingSize: "xs",
              hint: "This is a hint",
              // error: index % 3 === 0 ? { text: "This is an error" } : null,
              name: `text-input${index + 1}`,
              id: `text-input${index + 1}`,
              size: [null, "xl", "l", "m", "s", "xs"][index] || null,
            },
          }),
        "",
      ),
    id: "fieldset-1",
  },
};
