import Fieldset from "./template.njk?raw";
import TextInput from "../text-input/template.njk";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

const argTypes = Object.fromEntries(
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
);

export default {
  title: "Components/Fieldset",
  argTypes,
  render: (params) => {
    nunjucks.configure("src");
    return nunjucks.renderString(Fieldset, { params });
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
          TextInput({
            params: {
              label: "Text input",
              headingLevel: 2,
              headingSize: "xs",
              // hint: index %2 === 0 ? "This is a hint" : null,
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
