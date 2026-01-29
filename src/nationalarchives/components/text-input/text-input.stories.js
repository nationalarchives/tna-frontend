import Template from "./template.njk?raw";
import nunjucks from "nunjucks";
import macroOptions from "./macro-options.json";
import { within, expect } from "storybook/test";

nunjucks.configure(import.meta.env.PROD ? "" : "src");

export default {
  title: "Components/Text input",
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
      type: { control: "string" },
      password: { control: "boolean" },
      inputmode: {
        control: "select",
        options: [
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url",
        ],
      },
      spellcheck: { control: "boolean" },
      autocapitalize: {
        control: "select",
        options: ["off", "on", "words", "characters"],
      },
      autocorrect: { control: "boolean" },
      autocomplete: {
        control: "select",
        options: [
          "name",
          "honorific-prefix",
          "given-name",
          "additional-name",
          "family-name",
          "honorific-suffix",
          "nickname",
          "username",
          "new-password",
          "current-password",
          "one-time-code",
          "organization-title",
          "organization",
          "street-address",
          "address-line1",
          "address-line2",
          "address-line3",
          "address-level4",
          "address-level3",
          "address-level2",
          "address-level1",
          "country",
          "country-name",
          "postal-code",
          "cc-name",
          "cc-given-name",
          "cc-additional-name",
          "cc-family-name",
          "cc-number",
          "cc-exp",
          "cc-exp-month",
          "cc-exp-year",
          "cc-csc",
          "cc-type",
          "transaction-currency",
          "transaction-amount",
          "language",
          "bday",
          "bday-day",
          "bday-month",
          "bday-year",
          "sex",
          "url",
          "photo",
          "email",
        ],
      },
      size: { control: "inline-radio", options: ["xs", "s", "m", "l", "xl"] },
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
  parameters: {
    chromatic: { delay: 1000 },
  },
  render: (params) => {
    return nunjucks.renderString(Template, { params });
  },
};

export const Standard = {
  args: {
    label: "Enter your first name",
    headingLevel: 4,
    headingSize: "m",
    id: "firstname1",
    name: "firstname1",
    classes: "tna-text-input--demo",
  },
};

export const Predefined = {
  args: {
    label: "Edit your first name",
    headingLevel: 4,
    headingSize: "m",
    id: "firstname2",
    name: "firstname2",
    value: "John",
    classes: "tna-text-input--demo",
  },
};

export const WithHint = {
  args: {
    label: "Enter your first name",
    headingLevel: 4,
    headingSize: "m",
    id: "firstname3",
    name: "firstname3",
    hint: "What people call you by",
    classes: "tna-text-input--demo",
  },
};

export const Error = {
  args: {
    label: "Enter your first name",
    headingLevel: 4,
    headingSize: "m",
    id: "firstname4",
    name: "firstname4",
    error: {
      text: "Enter a name",
    },
    classes: "tna-text-input--demo",
  },
};

export const Password = {
  args: {
    label: "Enter your password",
    headingLevel: 4,
    headingSize: "m",
    id: "password",
    name: "password",
    password: true,
    classes: "tna-text-input--demo",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const $input = canvas.getByLabelText("Enter your password");
    const $button = canvas.getByRole("button");

    await expect($input.type).toEqual("password");
    await expect($button.ariaLabel).toEqual("Show password");

    await $input.focus();
    await expect($input).toHaveFocus();

    await $button.click();

    await expect($input).toHaveFocus();
    await expect($input.type).toEqual("text");
    await expect($button.ariaLabel).toEqual("Hide password");

    await $button.click();

    await expect($input).toHaveFocus();
    await expect($input.type).toEqual("password");
    await expect($button.ariaLabel).toEqual("Show password");
  },
};
