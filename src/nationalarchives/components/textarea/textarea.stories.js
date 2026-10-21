import nunjucks from "nunjucks";
import { expect, userEvent, within } from "storybook/test";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

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
      characterCount: { control: "object" },
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
  render: (params) => nunjucks.renderString(Template, { params }),
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

export const CharacterCount = {
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback5",
    name: "feedback5",
    value: "I think this is a good idea",
    characterCount: {
      max: 100,
      debounceDuration: 100,
    },
    classes: "tna-textarea--demo",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      $input = canvas.getByRole("textbox"),
      $staticCountLabel = canvasElement.querySelector("#feedback5-count"),
      $liveCount = canvasElement.querySelector(".tna-textarea-count"),
      $ariaCount = canvasElement.querySelector("[aria-live]");

    const initialValue = $input.value;

    await expect($input).toHaveValue("I think this is a good idea");
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent(
      "You have 73 characters remaining",
    );
    await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent(
      "You have 73 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");

    await userEvent.type($input, " and some more text");
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent(
      "You have 54 characters remaining",
    );
    await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent(
      "You have 73 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    // Wait for the debounce
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect($ariaCount).toHaveTextContent(
      "You have 54 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");

    await userEvent.type(
      $input,
      " and some more text and some more text and some more ",
    );
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent(
      "You have 1 character remaining",
    );
    await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent(
      "You have 54 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    // Wait for the debounce
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect($ariaCount).toHaveTextContent(
      "You have 1 character remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");

    await userEvent.type($input, "t");
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent(
      "You have 0 characters remaining",
    );
    await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent(
      "You have 1 character remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    // Wait for the debounce
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect($ariaCount).toHaveTextContent(
      "You have 0 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");

    await userEvent.type($input, "e");
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent("You have 1 character too many");
    await expect($liveCount).toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent(
      "You have 0 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    // Wait for the debounce
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect($ariaCount).toHaveTextContent("You have 1 character too many");
    await expect($ariaCount).not.toHaveAttribute("aria-hidden");

    await userEvent.type($input, "xt");
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent(
      "You have 3 characters too many",
    );
    await expect($liveCount).toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent("You have 1 character too many");
    await expect($ariaCount).not.toHaveAttribute("aria-hidden", "true");
    // Wait for the debounce
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect($ariaCount).toHaveTextContent(
      "You have 3 characters too many",
    );
    await expect($ariaCount).not.toHaveAttribute("aria-hidden");

    await userEvent.clear($input);
    await userEvent.type($input, initialValue);
    await expect($staticCountLabel).toHaveTextContent(
      "You can enter up to 100 characters",
    );
    await expect($liveCount).toHaveTextContent(
      "You have 73 characters remaining",
    );
    await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
    await expect($ariaCount).toHaveTextContent(
      "You have 3 characters too many",
    );
    await expect($ariaCount).not.toHaveAttribute("aria-hidden", "true");
    // Wait for the debounce
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect($ariaCount).toHaveTextContent(
      "You have 73 characters remaining",
    );
    await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
  },
};

export const CharacterCountWords = {
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback6",
    name: "feedback6",
    characterCount: {
      max: 10,
      countType: "words",
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
    id: "feedback7",
    name: "feedback7",
    value: "   Series 1\n   \nSeries 2   \n   Series 3   ",
    itemiseRows: true,
    classes: "tna-textarea--demo",
    formItemAttributes: {
      "data-enhanced-hint": "Enter a series and press enter",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      $input = canvas.getByRole("textbox"),
      $button = canvas.getByRole("button", { name: "Add to list" }),
      $helper = canvasElement.querySelector("#feedback7-list-helper"),
      $ariaLive = canvasElement.querySelector("[aria-live]"),
      $list = canvas.getByRole("list");

    await expect($ariaLive).toHaveAttribute("aria-live", "polite");

    await expect($helper).toHaveTextContent("3 items added");
    await expect($list.children).toHaveLength(3);
    await expect($ariaLive).toHaveTextContent("");

    await userEvent.type($input, "Series 4");
    await userEvent.click($button);
    await expect($helper).toHaveTextContent("4 items added");
    await expect($ariaLive).toHaveTextContent("'Series 4' added");
    await expect($list.children).toHaveLength(4);
    await expect($input).toHaveValue("");
    await expect($input).toHaveFocus();

    await userEvent.type($input, "Series 5{enter}");
    await expect($helper).toHaveTextContent("5 items added");
    await expect($ariaLive).toHaveTextContent("'Series 5' added");
    await expect($list.children).toHaveLength(5);
    await expect($input).toHaveValue("");
    await expect($input).toHaveFocus();

    await userEvent.click($list.querySelector("li:nth-child(2) button"));
    await expect($helper).toHaveTextContent("4 items added");
    await expect($ariaLive).toHaveTextContent("'Series 2' removed");
    await expect($list.children).toHaveLength(4);
    await expect($input).toHaveValue("");
    await expect($list).toHaveFocus();

    while ($list.children.length > 0) {
      await userEvent.click($list.querySelector("li:first-child button"));
    }
    await expect($helper).toHaveTextContent("0 items added");
    await expect($list.children).toHaveLength(0);
    await expect($input).toHaveValue("");
    await expect($input).toHaveFocus();

    await userEvent.type($input, "Test");
    await userEvent.click($button);
    await expect($helper).toHaveTextContent("1 item added");
    await expect($ariaLive).toHaveTextContent("'Test' added");
    await expect($list.children).toHaveLength(1);
    await expect($input).toHaveValue("");
    await expect($input).toHaveFocus();

    await userEvent.type($input, "Test");
    await userEvent.click($button);
    await expect($helper).toHaveTextContent("1 item added");
    await expect($ariaLive).toHaveTextContent("'Test' already added");
    await expect($list.children).toHaveLength(1);
    await expect($input).toHaveValue("");
    await expect($input).toHaveFocus();

    await userEvent.type($input, "  tEST   ");
    await userEvent.click($button);
    await expect($helper).toHaveTextContent("1 item added");
    await expect($ariaLive).toHaveTextContent("'tEST' already added");
    await expect($list.children).toHaveLength(1);
    await expect($input).toHaveValue("");
    await expect($input).toHaveFocus();
  },
};
