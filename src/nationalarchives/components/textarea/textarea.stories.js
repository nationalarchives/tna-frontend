import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, userEvent, expect } from "storybook/test";

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
      itemiseRows: { control: "boolean" },
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

export const ItemiseRows = {
  args: {
    label: "Search series",
    headingLevel: 4,
    headingSize: "m",
    hint: "Enter each series on a separate line",
    id: "feedback5",
    name: "feedback5",
    value: "   Series 1\n   \nSeries 2   \n   Series 3   ",
    itemiseRows: true,
    classes: "tna-textarea--demo",
    formItemAttributes: {
      "data-enhanced-hint": "Enter a series and press enter",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const $input = canvas.getByRole("textbox");
    const $button = canvas.getByRole("button", { name: "Add to list" });
    const $helper = canvasElement.querySelector("#feedback5-list-helper");
    const $list = canvas.getByRole("list");

    await expect($helper).toHaveTextContent("3 items added");
    await expect($list.children).toHaveLength(3);

    await userEvent.type($input, "Series 4");
    await userEvent.click($button);
    await expect($helper).toHaveTextContent("4 items added");
    await expect($list.children).toHaveLength(4);

    await userEvent.type($input, "Series 5{enter}");
    await expect($helper).toHaveTextContent("5 items added");
    await expect($list.children).toHaveLength(5);
  },
};
