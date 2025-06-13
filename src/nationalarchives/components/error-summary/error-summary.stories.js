import ErrorSummary from "./template.njk";
import TextInput from "../text-input/template.njk";
import macroOptions from "./macro-options.json";

const argTypes = {
  title: { control: "text" },
  headingLevel: { control: { type: "number", min: 1, max: 6 } },
  items: { control: "object" },
  disableAutoFocus: { control: "boolean" },
  classes: { control: "text" },
  attributes: { control: "object" },
};

Object.keys(argTypes).forEach((argType) => {
  argTypes[argType].description = macroOptions.find(
    (option) => option.name === argType,
  )?.description;
});

export default {
  title: "Components/Error summary",
  argTypes,
};

const Template = ({
  title,
  headingLevel,
  items,
  disableAutoFocus,
  classes,
  attributes,
}) =>
  ErrorSummary({
    params: {
      title,
      headingLevel,
      items,
      disableAutoFocus,
      classes,
      attributes,
    },
  });

export const Standard = Template.bind({});
Standard.args = {
  title: "There is a problem",
  headingLevel: 2,
  items: [
    {
      text: "Enter your full name",
      href: "#",
    },
    {
      text: "The date of the record cannot be in the future",
      href: "#",
    },
  ],
  disableAutoFocus: true,
  classes: "tna-error-summary--demo",
};

const FormTemplate = ({ items }) =>
  `${ErrorSummary({
    params: {
      title: "There is a problem",
      headingLevel: 2,
      items: Array(items)
        .fill("")
        .map((item, index) => ({
          text: `Error on field ${index + 1}`,
          href: `#input-${index + 1}`,
        })),
      disableAutoFocus: true,
      classes: "tna-error-summary--demo",
    },
  })}${Array(items)
    .fill("")
    .map((item, index) =>
      TextInput({
        params: {
          label: `Field ${index + 1}`,
          id: `input-${index + 1}`,
          name: `input-${index + 1}`,
          error: {
            text: "There is a problem",
          },
        },
      }),
    )
    .join("")}`;

export const ScrollExample = FormTemplate.bind({});
ScrollExample.args = {
  items: 24,
};
