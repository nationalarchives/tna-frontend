import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Textarea",
  argTypes: Object.fromEntries(
    Object.entries({
      label: { control: "text" },
      headingLevel: { control: { type: "number", min: 0, max: 6 } },
      headingSize: {
        control: "inline-radio",
        options: ["xs", "s", "m", "l", "xl"],
      },
      id: { control: "text" },
      name: { control: "text" },
      hint: { control: "text" },
      value: { control: "text" },
      error: { control: "object" },
      spellcheck: { control: "boolean" },
      autocapitalize: {
        control: "select",
        options: ["off", "on", "words", "characters"],
      },
      autocorrect: { control: "boolean" },
      size: { control: "inline-radio", options: ["m", "l", "xl"] },
      rows: { control: "number" },
      formItemClasses: { control: "text" },
      formItemAttributes: { control: "object" },
      classes: { control: "text" },
      attributes: { control: "object" },
    }).map(([key, value]) => [
      key,
      {
        ...value,
        description: macroOptions.find((option) => option.name === key)
          ?.description,
        table: {
          type: {
            summary: macroOptions.find((option) => option.name === key)?.type,
          },
          defaultValue: {
            summary: macroOptions.find((option) => option.name === key)
              ?.default,
          },
        },
      },
    ]),
  ),
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback1",
    name: "feedback1",
    classes: "tna-textarea--demo",
  },
};

export const Predefined = {
  args: {
    label: "Edit your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback2",
    name: "feedback2",
    value: "I like this 👍🏼",
    classes: "tna-textarea--demo",
  },
};

export const WithHint = {
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback3",
    name: "feedback3",
    hint: "What did you think?",
    classes: "tna-textarea--demo",
  },
};

export const Error = {
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback4",
    name: "feedback4",
    error: {
      text: "Enter some feedback",
    },
    classes: "tna-textarea--demo",
  },
};
