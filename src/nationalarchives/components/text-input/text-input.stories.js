import TextInput from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  label: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
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
  inputmode: {
    control: "select",
    options: ["text", "decimal", "numeric", "tel", "search", "email", "url"],
  },
  autofill: {
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
  maxLength: { control: "number" },
  inline: { control: "boolean" },
  formGroupClasses: { control: "text" },
  formGroupAttributes: { control: "object" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Text input",
  argTypes,
};

const Template = ({
  label,
  headingLevel,
  headingSize,
  id,
  name,
  hint,
  value,
  error,
  spellcheck,
  inputmode,
  autofill,
  size,
  maxLength,
  inline,
  formGroupClasses,
  formGroupAttributes,
  classes,
  attributes,
}) =>
  TextInput({
    params: {
      label,
      headingLevel,
      headingSize,
      id,
      name,
      hint,
      value,
      error,
      spellcheck,
      inputmode,
      autofill,
      size,
      maxLength,
      inline,
      formGroupClasses,
      formGroupAttributes,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  label: "Enter your first name",
  headingLevel: 4,
  headingSize: "m",
  id: "firstname1",
  name: "firstname1",
  classes: "tna-text-input--demo",
};

export const Predefined = Template.bind({});
Predefined.args = {
  label: "Edit your first name",
  headingLevel: 4,
  headingSize: "m",
  id: "firstname2",
  name: "firstname2",
  value: "John",
  classes: "tna-text-input--demo",
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Enter your first name",
  headingLevel: 4,
  headingSize: "m",
  id: "firstname3",
  name: "firstname3",
  hint: "What people call you by",
  classes: "tna-text-input--demo",
};

export const Error = Template.bind({});
Error.args = {
  label: "Enter your first name",
  headingLevel: 4,
  headingSize: "m",
  id: "firstname4",
  name: "firstname4",
  error: {
    text: "Enter a name",
  },
  classes: "tna-text-input--demo",
};

export const Inline = Template.bind({});
Inline.args = {
  label: "Enter your first name",
  headingLevel: 4,
  headingSize: "xs",
  id: "firstname5",
  name: "firstname5",
  inline: true,
  classes: "tna-text-input--demo",
};
