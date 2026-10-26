import { expect, userEvent, within } from "storybook/test";

import { renderString } from "../../../../.storybook/nunjucks.js";

import macroOptions from "./macro-options.json";
import Template from "./template.njk?raw";

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
      autoVerticalResize: { control: "boolean" },
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
  render: (params) => renderString(Template, { params }, { padded: true }),
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
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement),
      $input = canvas.getByRole("textbox"),
      $staticCountLabel = canvasElement.querySelector("#feedback5-count"),
      $liveCount = canvasElement.querySelector(".tna-textarea-count"),
      $ariaCount = canvasElement.querySelector("[aria-live]");

    const { debounceDuration } = args.characterCount;

    const initialValue = $input.value;

    await step("Check initial state", async () => {
      await expect($input).toHaveValue("I think this is a good idea");
      await expect($input).not.toHaveClass("tna-textarea--error");
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
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Type some text", async () => {
      await userEvent.type($input, " and some more text");
      await expect($input).not.toHaveClass("tna-textarea--error");
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
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
      // Wait for the debounce
      await new Promise((resolve) =>
        setTimeout(resolve, debounceDuration * 1.5),
      );
      await expect($ariaCount).toHaveTextContent(
        "You have 54 characters remaining",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Type more text to reach near limit", async () => {
      await userEvent.type(
        $input,
        " and some more text and some more text and some more ",
      );
      await expect($input).not.toHaveClass("tna-textarea--error");
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
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
      // Wait for the debounce
      await new Promise((resolve) =>
        setTimeout(resolve, debounceDuration * 1.5),
      );
      await expect($ariaCount).toHaveTextContent(
        "You have 1 character remaining",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Type text to reach the limit", async () => {
      await userEvent.type($input, "t");
      await expect($input).not.toHaveClass("tna-textarea--error");
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
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
      // Wait for the debounce
      await new Promise((resolve) =>
        setTimeout(resolve, debounceDuration * 1.5),
      );
      await expect($ariaCount).toHaveTextContent(
        "You have 0 characters remaining",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Type text to exceed the limit", async () => {
      await userEvent.type($input, "e");
      await expect($input).toHaveClass("tna-textarea--error");
      await expect($staticCountLabel).toHaveTextContent(
        "You can enter up to 100 characters",
      );
      await expect($liveCount).toHaveTextContent(
        "You have 1 character too many",
      );
      await expect($liveCount).toHaveClass("tna-textarea-count--error");
      await expect($ariaCount).toHaveTextContent(
        "You have 0 characters remaining",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
      // Wait for the debounce
      await new Promise((resolve) =>
        setTimeout(resolve, debounceDuration * 1.5),
      );
      await expect($ariaCount).toHaveTextContent(
        "You have 1 character too many",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Type more text to exceed the limit further", async () => {
      await userEvent.type($input, "xt");
      await expect($input).toHaveClass("tna-textarea--error");
      await expect($staticCountLabel).toHaveTextContent(
        "You can enter up to 100 characters",
      );
      await expect($liveCount).toHaveTextContent(
        "You have 3 characters too many",
      );
      await expect($liveCount).toHaveClass("tna-textarea-count--error");
      await expect($ariaCount).toHaveTextContent(
        "You have 1 character too many",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
      // Wait for the debounce
      await new Promise((resolve) =>
        setTimeout(resolve, debounceDuration * 1.5),
      );
      await expect($ariaCount).toHaveTextContent(
        "You have 3 characters too many",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Remove some text to go back within the limit", async () => {
      await userEvent.keyboard("{Backspace}{Backspace}{Backspace}");
      await expect($input).not.toHaveClass("tna-textarea--error");
      await expect($staticCountLabel).toHaveTextContent(
        "You can enter up to 100 characters",
      );
      await expect($liveCount).toHaveTextContent(
        "You have 0 characters remaining",
      );
      await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
      await expect($ariaCount).toHaveTextContent(
        "You have 3 characters too many",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
      // Wait for the debounce
      await new Promise((resolve) =>
        setTimeout(resolve, debounceDuration * 1.5),
      );
      await expect($ariaCount).toHaveTextContent(
        "You have 0 characters remaining",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Clear the input and type the initial value", async () => {
      await userEvent.clear($input);
      await userEvent.type($input, initialValue);
      await expect($input).not.toHaveClass("tna-textarea--error");
      await expect($staticCountLabel).toHaveTextContent(
        "You can enter up to 100 characters",
      );
      await expect($liveCount).toHaveTextContent(
        "You have 73 characters remaining",
      );
      await expect($liveCount).not.toHaveClass("tna-textarea-count--error");
      await expect($ariaCount).toHaveTextContent(
        "You have 0 characters remaining",
      );
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await $input.blur();
  },
};

export const CharacterCountWithThreshold = {
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback6",
    name: "feedback6",
    value: "I think this is a good idea",
    characterCount: {
      max: 100,
      debounceDuration: 100,
      threshold: 80,
    },
    classes: "tna-textarea--demo",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement),
      $input = canvas.getByRole("textbox"),
      $staticCountLabel = canvasElement.querySelector("#feedback6-count"),
      $liveCount = canvasElement.querySelector(".tna-textarea-count"),
      $ariaCount = canvasElement.querySelector("[aria-live]");

    const initialValue = $input.value;

    await step("Check initial state", async () => {
      await expect($input).toHaveValue("I think this is a good idea");
      await expect($input).not.toHaveClass("tna-textarea--error");
      await expect($liveCount).not.toBeVisible();
      await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    });

    await step("Type some text", async () => {
      await userEvent.type($input, " and some more text");
      await expect($input).not.toHaveClass("tna-textarea--error");
      await expect($liveCount).not.toBeVisible();
      await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    });

    await step("Type more text to reach threshold", async () => {
      await userEvent.type(
        $input,
        " and some more text and some more text and ",
      );
      await expect($input).not.toHaveClass("tna-textarea--error");
      await expect($liveCount).toBeVisible();
      await expect($ariaCount).not.toHaveAttribute("aria-hidden");
    });

    await step("Remove some text to go back within the threshold", async () => {
      await userEvent.keyboard(
        "{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}",
      );
      await expect($liveCount).not.toBeVisible();
      await expect($ariaCount).toHaveAttribute("aria-hidden", "true");
    });

    await step("Clear the input and type the initial value", async () => {
      await userEvent.clear($input);
      await userEvent.type($input, initialValue);
      await expect($input).not.toHaveClass("tna-textarea--error");
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
    });

    await $input.blur();
  },
};

export const CharacterCountWords = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    label: "Enter your feedback",
    headingLevel: 4,
    headingSize: "m",
    id: "feedback7",
    name: "feedback7",
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
    id: "feedback8",
    name: "feedback8",
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
      $helper = canvasElement.querySelector("#feedback8-list-helper"),
      $ariaLive = canvasElement.querySelector("[aria-live]"),
      $list = canvas.getByRole("list");

    await expect($ariaLive).toHaveAttribute("aria-live", "assertive");

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
