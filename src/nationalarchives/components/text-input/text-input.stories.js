import TextInput from "./template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
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
    options: ["text", "decimal", "numeric", "tel", "search", "email", "url"],
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
  type,
  password,
  inputmode,
  spellcheck,
  autocapitalize,
  autocorrect,
  autocomplete,
  size,
  formItemClasses,
  formItemAttributes,
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
      type,
      password,
      inputmode,
      spellcheck,
      autocapitalize,
      autocorrect,
      autocomplete,
      size,
      formItemClasses,
      formItemAttributes,
      classes,
      attributes,
    },
  });

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

export const Password = Template.bind({});
Password.args = {
  label: "Enter your password",
  headingLevel: 4,
  headingSize: "m",
  id: "password",
  name: "password",
  password: true,
  classes: "tna-text-input--demo",
};
